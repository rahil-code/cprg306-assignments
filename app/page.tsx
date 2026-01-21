import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>

      <ul>
        <li>
          <Link href="/week-2">Week 2</Link>
        </li>
      </ul>

      <p>
        This site contains weekly assignments for CPRG 306. Each week will be
        added as a new folder under the app directory.
      </p>
    </main>
  );
}
