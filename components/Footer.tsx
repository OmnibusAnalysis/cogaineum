const Footer = () => {
  return (
    <footer className="bg-black py-8 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} CoGaineum. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
