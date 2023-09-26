import { FaSistrix } from 'react-icons/fa';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  Header,
  SearchButton,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';

const initialValues = { query: '' };
const shema = yup.object().shape({ query: yup.string().required() });

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={initialValues}
        onSubmit={values => onSubmit(values)}
        validateShema={shema}
      >
        <SearchForm>
          <SearchButton type="submit" aria-label="Search Images">
            <FaSistrix size="20px" />
          </SearchButton>

          <SearchInput
            className="SearchForm-input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="query" />
        </SearchForm>
      </Formik>
    </Header>
  );
};
