import ConverterForm from "./components/ConverterForm";

function App() {
  return (
    <>
      <div
        className={`flex min-h-screen items-center justify-center bg-[#030728] bg-[url(./assets/bg.png)] text-gray-200`}
      >
        <div className="mx-4 max-w-md w-full rounded-lg border border-[#02072880] bg-[#02072880] px-8 pt-10 pb-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <h2 className="text-center text-2xl font-semibold">
            Currency Converter
          </h2>
          <ConverterForm />
        </div>
      </div>
    </>
  );
}

export default App;
