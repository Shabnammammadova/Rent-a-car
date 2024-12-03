import authService from '@/services/auth/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';


const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
});

const ForgotPassword = () => {
    return (
        <section className="flex items-center justify-center mx-auto">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[500px] md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white">
                            Forgot Password
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Enter your email address to reset your password.
                        </p>
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={ForgotPasswordSchema}
                            onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
                                try {
                                    await authService.forgotPassword(values);
                                    setStatus({ success: true, message: "An email has been sent to reset your password." });
                                } catch (error: any) {
                                    setErrors({ email: error.response?.data?.message || "Something went wrong!" });
                                    setStatus({ success: false, message: "Failed to send reset email." });
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                status,
                            }) => (
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && (
                                            <div className="text-red-600 text-sm">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Continue
                                        </button>
                                        <button
                                            type="button"
                                            className="text-white bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={() => console.log("Cancel clicked!")}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    {status && status.message && (
                                        <div
                                            className={
                                                status.success
                                                    ? "text-green-600 text-sm"
                                                    : "text-red-600 text-sm"
                                            }
                                        >
                                            {status.message}
                                        </div>
                                    )}
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
