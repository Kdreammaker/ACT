
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import NoticeDetail from './NoticeDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' }
  ];
}

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <NoticeDetail noticeId={params.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
