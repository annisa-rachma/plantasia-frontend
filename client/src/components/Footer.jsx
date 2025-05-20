export default function Footer() {
  return (
    <footer className="max-w-[1440px] mx-auto mb-4 mt-24 px-4 sm:px-12">
      <div className="border-t-[4px] border-black grid grid-cols-1 md:grid-cols-3 gap-y-6 py-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start md:justify-start">
          <span>© Plantasia 2023</span>
          <a href="#" className="hover:text-gray-600">
            Terms
          </a>
          <a href="#" className="hover:text-gray-600">
            Subscribe
          </a>
        </div>

        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-gray-600">
            Facebook
          </a>
          <a href="#" className="hover:text-gray-600">
            Twitter
          </a>
          <a href="#" className="hover:text-gray-600">
            Instagram
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <a href="#" className="hover:text-gray-600">
            Website design & development by Six
          </a>
        </div>
      </div>
    </footer>
  );
}
