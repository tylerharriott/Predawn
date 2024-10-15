import { useRouter } from 'next/router';
import ArtistPage from '../../components/ArtistPage';

function Artist() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  return <ArtistPage artistId={id} />;
}

export default Artist;
