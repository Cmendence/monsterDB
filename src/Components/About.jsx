
export default function About() {
  return (
    <div className="text-center text-gray-800 mt-10">
      <h1 className=" text-3xl font-semibold p-4 ">
        Welcome to my D&D 2e Monster Database!
      </h1>
      <div className="text-base text-center p-4">
        <p className="mb-6">
          This project was inspired by a friend who could not find a D&D 2e
          Monster database with filters to get the desired monsters based on hit
          dice, climate, terrain, or activity cycle.
        </p>
        <p className="mb-6">
          All credit for the data available here goes to{" "}
          <a
            className="text-pink-600 font-semibold"
            href="https://web.archive.org/web/20180818101608/http://lomion.de/cmm/_index.php"
            target="_blank"
            rel="noreferrer"
          >
            lomion.de
          </a>{" "}
          for the original, and Nicholas Decheine for creating{" "}
          <a
            className="text-pink-600 font-semibold"
            href="https://www.completecompendium.com/"
            target="_blank"
            rel="noreferrer"
          >
            Complete Compendium
          </a>{" "}
          as well as his generosity for making the entire project publicly
          available on{" "}
          <a
            className="text-pink-600 font-semibold"
            href="https://github.com/decheine/complete-compendium"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <p>
          This app is fully optimized for mobile! Add it to your home screen and
          use it like you would any other app.
        </p>
      </div>
    </div>
  );
}
