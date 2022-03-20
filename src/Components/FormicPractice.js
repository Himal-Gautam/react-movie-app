import { useFormik } from "formik";

const validateForm = (values) => {
  console.log("validateForm", values);
  const errors = {};

  if (values.password.length < 5 || values.password.length > 12) {
    errors.password =
      "Please provide a password longer than 8 and shorter than 12";
  }

  console.log("errors", errors);
  return errors;
};

export function FormicPractice() {
  const formik = useFormik({
    initialValues: { email: "good", password: "bad" },
    validate: validateForm,
    onSubmit: (values) => {
      console.log("onSubmit", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        type="email"
        placeholder="email"
      />
      <input
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        type="password"
        placeholder="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
