import QnADetail from './QnADetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default function QnADetailPage({ params }: { params: { id: string } }) {
  return <QnADetail qnaId={params.id} />;
}