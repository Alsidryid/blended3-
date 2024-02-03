import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState('');

  const handleSearch = region => {
    setRegion(region);
    setError(null);
  };

  useEffect(() => {
    if (!region) return;

    const fethCountries = async () => {
      setLoading(true);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fethCountries();
  }, [region]);
  return (
    <Section>
      <Container>
        {error && <Heading>{error}</Heading>}
        {loading && <Loader />}
        <SearchForm handleSearch={handleSearch} />
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
