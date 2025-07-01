'use server'; // This entire file will only run on the server

import { cookies } from 'next/headers';
import { z } from 'zod';
const SendCodeSchema = z
  .object({
    user_type: z.string().nonempty('User type is required.'),
    byMobileOrEmail: z.enum(['mobile', 'email']),
    // These fields are optional at the object level
    email: z.string().email().optional(),
    mobile: z.string().min(5, 'Phone number is too short.').optional(),
    country_code: z.string().nonempty('Country code is required.').optional(),
  })
  .superRefine((data, ctx) => {
    // This block enforces the conditional logic
    if (data.byMobileOrEmail === 'email') {
      if (!data.email) {
        ctx.addIssue({
          code: 'custom',
          path: ['email'],
          message: 'الرجاء إدخال بريد إلكتروني صالح.',
        });
      }
    } else if (data.byMobileOrEmail === 'mobile') {
      if (!data.mobile) {
        ctx.addIssue({
          code: 'custom',
          path: ['mobile'],
          message: 'رقم الهاتف مطلوب.',
        });
      }
      if (!data.country_code) {
        ctx.addIssue({
          code: 'custom',
          path: ['country_code'],
          message: 'رمز الدولة مطلوب.',
        });
      }
    }
  });

// This is our main server action function

export async function createUserByEmail(prevState, formData) {
  // 1. Extract and validate data
  const byMobileOrEmail = formData.get('byMobileOrEmail');
  const dataToValidate = {
    user_type: formData.get('user_type'),
    byMobileOrEmail: formData.get('byMobileOrEmail'),
    // email: formData.get('email'),
    // mobile: formData.get('mobile'),
    // country_code: formData.get('country_code'),
  };

  if (byMobileOrEmail === 'email') {
    dataToValidate.email = formData.get('email');
  } else if (byMobileOrEmail === 'mobile') {
    dataToValidate.mobile = formData.get('mobile');
    dataToValidate.country_code = formData.get('country_code');
  }

  const validatedFields = SendCodeSchema.safeParse(dataToValidate);
  // console.log(dataToValidate)9;
  if (!validatedFields.success) {
    // Return errors if validation fails
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'فشل التحقق من البيانات.',
    };
  }

  const body = new URLSearchParams();
  const { data } = validatedFields; // Use the clean data from Zod
  body.append('user_type', data.user_type);
  body.append('byMobileOrEmail', data.byMobileOrEmail);

  if (data.byMobileOrEmail === 'email') {
    body.append('email', data.email);
  } else {
    body.append('mobile', data.mobile);
    body.append('country_code', data.country_code);
  }

  //   console.log(body);
  // 4. Make the POST request to the external API
  try {
    const apiUrl = `${process.env.API_BASE_URL}/site/signup-send-code`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle API errors (e.g., user already exists)
      return {
        message: result.message || 'An API error occurred.',
        status: response.status,
      };
    }

    // On success, redirect or show a success message
    // You might want to navigate the user to the "enter code" page
    return {
      message: result.message || 'Verification code sent successfully!',
      status: response.status,
    };
  } catch (error) {
    console.error('Fetch Error:', error);
    return { message: 'A network error occurred. Please try again.' };
  }
}

const VerifyCodeSchema = z
  .object({
    user_type: z.string().min(1, 'User type is required.'),
    byMobileOrEmail: z.enum(['mobile', 'email']),
    activation_code: z
      .string()
      .min(4, 'Activation code must be at least 4 digits.'),
    // Use .optional() for fields that might not be present.
    email: z.string().email().optional(),
    mobile: z.string().optional(),
    country_code: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // `data` is the object being validated, `ctx` is the context for adding errors.

    if (data.byMobileOrEmail === 'email') {
      // If the method is 'email', we MUST have a valid email.
      if (!data.email || !z.string().email().safeParse(data.email).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['email'], // Add the error to the 'email' field
          message: 'A valid email is required for this signup method.',
        });
      }
    } else if (data.byMobileOrEmail === 'mobile') {
      // If the method is 'mobile', we MUST have a valid mobile and country code.
      if (!data.mobile || data.mobile.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['mobile'],
          message: 'A valid phone number is required.',
        });
      }
      if (!data.country_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['country_code'],
          message: 'Country code is required.',
        });
      }
    }
  });

export async function signUpByActiveCode(prevState, formData) {
  const byMobileOrEmail = formData.get('byMobileOrEmail');
  let country_code = formData.get('country_code');
  if (typeof country_code === 'string') {
    country_code = country_code.replace('+', '00');
  }
  // 2. Create the object to be validated.
  const dataToValidate = {
    user_type: formData.get('user_type'),
    byMobileOrEmail: formData.get('byMobileOrEmail'),
    // email: formData.get('email'),

    activation_code: formData.get('otp'),

    // Use the correct key name 'activation_code'
  };

  if (byMobileOrEmail === 'email') {
    dataToValidate.email = formData.get('email');
  } else if (byMobileOrEmail === 'mobile') {
    dataToValidate.mobile = formData.get('mobile');
    dataToValidate.country_code = country_code;
  }
  console.log('dataToValidate===>', dataToValidate);
  // 3. Validate the data object against the static schema.
  const validationResult = VerifyCodeSchema.safeParse(dataToValidate);

  if (!validationResult.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // --- FIX #3: Prepare the body with the EXACT keys the API expects. ---
  const body = new URLSearchParams();
  const { data } = validationResult; // Get the cleaned data from Zod

  // Append all the fields required by the API.
  body.append('user_type', data.user_type);
  body.append('byMobileOrEmail', data.byMobileOrEmail);
  body.append('activation_code', data.activation_code);

  // Conditionally append email or mobile details.
  if (data.byMobileOrEmail === 'email' && data.email) {
    body.append('email', data.email);
  } else if (
    data.byMobileOrEmail === 'mobile' &&
    data.mobile &&
    data.country_code
  ) {
    body.append('mobile', data.mobile);
    body.append('country_code', data.country_code);
  }

  // console.log('body', body);

  try {
    const apiUrl = `${process.env.API_BASE_URL}/site/signup-by-activity-code`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message || 'The activation code is incorrect.' };
    }
    console.log('result======>', result);
    return { message: result.message, status: response.status };
    // console.log('API Success Response:', result);
  } catch (error) {
    console.error('Fetch Error:', error);
    return { message: 'A network error occurred.' };
  }
}

export async function SignInBySentCode(prevState, formData) {
  const VerifyCodeSchema = z
    .object({
      byMobileOrEmail: z.enum(['mobile', 'email']),
      email: z.string().email().optional(),
      mobile: z.string().optional(),
      country_code: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      // `data` is the object being validated, `ctx` is the context for adding errors.

      if (data.byMobileOrEmail === 'email') {
        // If the method is 'email', we MUST have a valid email.
        if (!data.email || !z.string().email().safeParse(data.email).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['email'], // Add the error to the 'email' field
            message: 'A valid email is required for this signup method.',
          });
        }
      } else if (data.byMobileOrEmail === 'mobile') {
        // If the method is 'mobile', we MUST have a valid mobile and country code.
        if (!data.mobile || data.mobile.length < 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['mobile'],
            message: 'A valid phone number is required.',
          });
        }
        if (!data.country_code) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['country_code'],
            message: 'Country code is required.',
          });
        }
      }
    });

  const byMobileOrEmail = formData.get('byMobileOrEmail');
  let country_code = formData.get('country_code');
  if (typeof country_code === 'string') {
    country_code = country_code.replace('+', '00');
  }
  // 2. Create the object to be validated.
  const dataToValidate = {
    byMobileOrEmail: formData.get('byMobileOrEmail'),
    activation_code: [
      formData.get('otp[0]'),
      formData.get('otp[1]'),
      formData.get('otp[2]'),
      formData.get('otp[3]'),
    ].join(''), // Use the correct key name 'activation_code'
  };

  if (byMobileOrEmail === 'email') {
    dataToValidate.email = formData.get('email');
  } else if (byMobileOrEmail === 'mobile') {
    dataToValidate.mobile = formData.get('mobile');
    dataToValidate.country_code = country_code;
  }

  // 3. Validate the data object against the static schema.
  const validationResult = VerifyCodeSchema.safeParse(dataToValidate);
  console.log('validationResult===>', validationResult);
  if (!validationResult.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  // --- FIX #3: Prepare the body with the EXACT keys the API expects. ---
  const body = new URLSearchParams();
  const { data } = validationResult; // Get the cleaned data from Zod

  // Append all the fields required by the API.

  body.append('byMobileOrEmail', data.byMobileOrEmail);
  body.append('activation_code', data.activation_code);

  // Conditionally append email or mobile details.
  if (data.byMobileOrEmail === 'email' && data.email) {
    body.append('email', data.email);
  } else if (
    data.byMobileOrEmail === 'mobile' &&
    data.mobile &&
    data.country_code
  ) {
    body.append('mobile', data.mobile);
    body.append('country_code', data.country_code);
  }
  try {
    const apiUrl = `${process.env.API_BASE_URL}/site/login-send-code`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message || 'The activation code is incorrect.' };
    }
    console.log('result======>', result);
    console.log('API Success Response:', result);
    return { message: result.message, status: response.status };
  } catch (error) {
    console.error('Fetch Error:', error);
    return { message: 'A network error occurred.' };
  }
}
export async function SignInByActiveCode(prevState, formData) {
  const VerifyCodeSchema = z
    .object({
      byMobileOrEmail: z.enum(['mobile', 'email']),
      email: z.string().email().optional(),
      mobile: z.string().optional(),
      country_code: z.string().optional(),
      activation_code: z
        .string()
        .min(4, 'Activation code must be at least 4 digits.'),
    })
    .superRefine((data, ctx) => {
      // `data` is the object being validated, `ctx` is the context for adding errors.

      if (data.byMobileOrEmail === 'email') {
        // If the method is 'email', we MUST have a valid email.
        if (!data.email || !z.string().email().safeParse(data.email).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['email'], // Add the error to the 'email' field
            message: 'A valid email is required for this signup method.',
          });
        }
      } else if (data.byMobileOrEmail === 'mobile') {
        // If the method is 'mobile', we MUST have a valid mobile and country code.
        if (!data.mobile || data.mobile.length < 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['mobile'],
            message: 'A valid phone number is required.',
          });
        }
        if (!data.country_code) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['country_code'],
            message: 'Country code is required.',
          });
        }
      }
    });
  const byMobileOrEmail = formData.get('byMobileOrEmail');
  let country_code = formData.get('country_code');
  if (typeof country_code === 'string') {
    country_code = country_code.replace('+', '00');
  }
  // 2. Create the object to be validated.
  const dataToValidate = {
    // user_type: formData.get('user_type'),
    byMobileOrEmail: formData.get('byMobileOrEmail'),
    // email: formData.get('email'),

    activation_code: formData.get('otp'),

    // Use the correct key name 'activation_code'
  };

  if (byMobileOrEmail === 'email') {
    dataToValidate.email = formData.get('email');
  } else if (byMobileOrEmail === 'mobile') {
    dataToValidate.mobile = formData.get('mobile');
    dataToValidate.country_code = country_code;
  }
  console.log('dataToValidate2===>', dataToValidate);
  // 3. Validate the data object against the static schema.
  const validationResult = VerifyCodeSchema.safeParse(dataToValidate);

  if (!validationResult.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // --- FIX #3: Prepare the body with the EXACT keys the API expects. ---
  const body = new URLSearchParams();
  const { data } = validationResult; // Get the cleaned data from Zod

  // Append all the fields required by the API.
  // body.append('user_type', data.user_type);
  body.append('byMobileOrEmail', data.byMobileOrEmail);
  body.append('activation_code', data.activation_code);

  // Conditionally append email or mobile details.
  if (data.byMobileOrEmail === 'email' && data.email) {
    body.append('email', data.email);
  } else if (
    data.byMobileOrEmail === 'mobile' &&
    data.mobile &&
    data.country_code
  ) {
    body.append('mobile', data.mobile);
    body.append('country_code', data.country_code);
  }

  // console.log('body', body);

  try {
    const apiUrl = `${process.env.API_BASE_URL}/site/login-by-activity-code`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });
    const result = await response.json();
    if (!response.ok) {
      return { message: result.message || 'The activation code is incorrect.' };
    }
    console.log('result', result);
    const token = JSON.stringify(result.data);
    const cookieStore = await cookies();
    cookieStore.set('session_info', token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      maxAge: 60 * 60 * 24 * 7, // Expires in 1 week
      path: '/', // Available for all paths
    });
    return { message: result.message, status: response.status };
  } catch (error) {
    console.error('Fetch Error:', error);
    return { message: 'A network error occurred.' };
  }
}

export async function signInByUsername(prevState, formData) {
  // 1. Define the validation schema for the login form.
  // We assume standard fields `username` and `password`.
  const SignInSchema = z.object({
    username: z.string().min(1, 'Username is required.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
  });

  // 2. Extract data from the form to be validated.
  const dataToValidate = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  // 3. Validate the data against the schema.
  const validationResult = SignInSchema.safeParse(dataToValidate);

  // 4. If validation fails, return the errors immediately.
  if (!validationResult.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 5. If validation succeeds, prepare the request body.
  // The API expects 'application/x-www-form-urlencoded' content type.
  const body = new URLSearchParams();
  const { data } = validationResult; // Use the clean, validated data from Zod

  body.append('username', data.username);
  body.append('password', data.password);

  // 6. Make the API call to the login endpoint.
  try {
    const apiUrl = `${process.env.API_BASE_URL}/site/login-by-username`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const result = await response.json();

    // 7. Handle non-successful API responses (e.g., 401 Unauthorized).
    if (!response.ok) {
      return { message: result.message || 'Invalid username or password.' };
    }
    console.log(response.status);
    // 8. On success, return the success message and status.
    // You might also handle setting cookies or tokens here.
    return {
      message: result.message,
      status: response.status ? response.status : 200,
    };
  } catch (error) {
    // 9. Handle network or other unexpected errors.
    console.error('Fetch Error:', error);
    return { message: 'A network error occurred. Please try again.' };
  }
}
export async function resetPasswordBySentCode(prevState, formData) {
  const VerifyCodeSchema = z
    .object({
      byMobileOrEmail: z.enum(['mobile', 'email']),
      email: z.string().email().optional(),
      mobile: z.string().optional(),
      country_code: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      // `data` is the object being validated, `ctx` is the context for adding errors.

      if (data.byMobileOrEmail === 'email') {
        // If the method is 'email', we MUST have a valid email.
        if (!data.email || !z.string().email().safeParse(data.email).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['email'], // Add the error to the 'email' field
            message: 'A valid email is required for this signup method.',
          });
        }
      } else if (data.byMobileOrEmail === 'mobile') {
        // If the method is 'mobile', we MUST have a valid mobile and country code.
        if (!data.mobile || data.mobile.length < 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['mobile'],
            message: 'A valid phone number is required.',
          });
        }
        if (!data.country_code) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['country_code'],
            message: 'Country code is required.',
          });
        }
      }
    });

  const byMobileOrEmail = formData.get('byMobileOrEmail');
  let country_code = formData.get('country_code');
  if (typeof country_code === 'string') {
    country_code = country_code.replace('+', '00');
  }
  // 2. Create the object to be validated.
  const dataToValidate = {
    byMobileOrEmail: formData.get('byMobileOrEmail'),
    activation_code: [
      formData.get('otp[0]'),
      formData.get('otp[1]'),
      formData.get('otp[2]'),
      formData.get('otp[3]'),
    ].join(''), // Use the correct key name 'activation_code'
  };

  if (byMobileOrEmail === 'email') {
    dataToValidate.email = formData.get('email');
  } else if (byMobileOrEmail === 'mobile') {
    dataToValidate.mobile = formData.get('mobile');
    dataToValidate.country_code = country_code;
  }

  // 3. Validate the data object against the static schema.
  const validationResult = VerifyCodeSchema.safeParse(dataToValidate);
  console.log('validationResult===>', validationResult);
  if (!validationResult.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  // --- FIX #3: Prepare the body with the EXACT keys the API expects. ---
  const body = new URLSearchParams();
  const { data } = validationResult; // Get the cleaned data from Zod

  // Append all the fields required by the API.

  body.append('byMobileOrEmail', data.byMobileOrEmail);
  body.append('activation_code', data.activation_code);

  // Conditionally append email or mobile details.
  if (data.byMobileOrEmail === 'email' && data.email) {
    body.append('email', data.email);
  } else if (
    data.byMobileOrEmail === 'mobile' &&
    data.mobile &&
    data.country_code
  ) {
    body.append('mobile', data.mobile);
    body.append('country_code', data.country_code);
  }
  try {
    const apiUrl = `${process.env.API_BASE_URL}/site/login-send-code`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message || 'The activation code is incorrect.' };
    }
    console.log('result======>', result);
    console.log('API Success Response:', result);
    return { message: result.message, status: response.status };
  } catch (error) {
    console.error('Fetch Error:', error);
    return { message: 'A network error occurred.' };
  }
}
