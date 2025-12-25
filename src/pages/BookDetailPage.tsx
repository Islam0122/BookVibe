import React, { useState } from 'react';
import { Home, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Book } from '../types/book';
import { ZoomControls } from '../components/ZoomControls';
import { downloadBook } from '../api/booksApi';

interface BookDetailPageProps {
  book: Book;
  onClose: () => void;
}

export const BookDetailPage: React.FC<BookDetailPageProps> = ({ book, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleDownload = async () => {
    if (book.downloadUrl) {
      try {
        await downloadBook(book.downloadUrl, book.title);
      } catch (err) {
        alert('Ошибка при скачивании книги');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <div className="bg-white shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            <Home size={20} />
            Назад
          </button>
          <div>
            <h2 className="font-bold text-lg">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ZoomControls
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleResetZoom}
          />

          {book.downloadUrl && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={20} />
              Скачать
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-purple-900 to-blue-900 overflow-auto p-8">
        {book.readUrl ? (
          <div
            className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              minHeight: '100%'
            }}
          >
            {!isIframeLoaded && (
              <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Загрузка книги...</p>
                </div>
              </div>
            )}

            <iframe
              src={book.readUrl}
              className="w-full h-screen border-0"
              title={book.title}
              onLoad={() => setIsIframeLoaded(true)}
              style={{ display: isIframeLoaded ? 'block' : 'none' }}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden p-12">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-8">📖</div>
              <h3 className="text-2xl font-bold text-gray-800">{book.title}</h3>
              <p className="text-xl text-gray-600">{book.author}</p>

              <div className="mt-8 text-gray-700">
                <p className="mb-4">
                  К сожалению, эта книга не имеет доступной HTML-версии для чтения онлайн.
                </p>
                {book.downloadUrl && (
                  <>
                    <p className="mb-6">
                      Вы можете скачать книгу в формате EPUB или другом доступном формате.
                    </p>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <Download size={20} />
                      Скачать книгу
                    </button>
                  </>
                )}
              </div>

              <div className="mt-12 pt-8 border-t">
                <h4 className="font-bold text-lg mb-4">О книге</h4>
                <div className="text-left space-y-2">
                  <p><strong>Автор:</strong> {book.author}</p>
                  <p><strong>Язык:</strong> {book.language}</p>
                  <p><strong>Загрузок:</strong> {book.views.toLocaleString()}</p>
                  {book.subjects.length > 0 && (
                    <div>
                      <strong>Категории:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {book.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                          >
                            {subject.split('--')[0].trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};