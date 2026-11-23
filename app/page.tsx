import BagelDefinition from '../components/BagelDefinition';
import Container from '../components/Container';
import FeaturedBagel from '../components/FeaturedBagel';
import { getHomePageData } from '../lib/api';

export default async function Home() {
  const { featuredBagel, bagelDefinition } = await getHomePageData();
  return (
    <Container>
      {featuredBagel && (
        <FeaturedBagel
          title={featuredBagel.bagelTitle}
          subtitle={featuredBagel.bagelSubtitle}
          desc={featuredBagel.bagelDescription}
          img={featuredBagel.bagelImage}
        />
      )}
      {bagelDefinition && (
        <BagelDefinition
          title={bagelDefinition.bagelTitle}
          quote={bagelDefinition.bagelQuote}
          desc={bagelDefinition.bagelDescription}
        />
      )}
    </Container>
  );
}
