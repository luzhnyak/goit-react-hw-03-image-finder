import { FaSistrix } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const initialValues = { query: 'cat' };
const shema = yup.object().shape({ query: yup.string().required() });

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="Searchbar">
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log('dddd');
          onSubmit(values);
        }}
        validateShema={shema}
      >
        <Form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <FaSistrix />
            <span className="SearchForm-button-label"></span>
          </button>

          <Field
            className="SearchForm-input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="query" />
        </Form>
      </Formik>
    </header>
  );
};
