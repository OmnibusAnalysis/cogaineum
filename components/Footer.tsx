const Footer = () => {
  return (
    <footer className="bg-black py-8 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gray-400">
          <span className="block sm:inline">© {new Date().getFullYear()} Cogaineum.</span>{' '}
          <span className="block sm:inline">Robert Maxwell Remlinger. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
