export const metadata = {
    title: 'View Product',
};
  
import Client from './Client';
  
export default function ViewProductPage({ params }) {
    return <Client id={params.id} />;
}