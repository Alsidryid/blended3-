import { Section, Container, CountryInfo, Loader, GoBackBtn } from 'components';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const findCountry = async () => {
      setLoading(true);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    findCountry();
  }, [countryId]);
  console.log(location);
  const from = location.state?.from || '/';
  return (
    <Section>
      <Container>
        {loading && <Loader />}
        <GoBackBtn path={from}> Go back</GoBackBtn>
        <CountryInfo country={country} />
      </Container>
    </Section>
  );
};
