
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import SampleNoticeDetail from './SampleNoticeDetail';

export default function SampleNoticePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SampleNoticeDetail />
        </div>
      </main>
      <Footer />
    </div>
  );
}
