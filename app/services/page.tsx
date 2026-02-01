import Header from "../../components/Header";

export default function ServicesPage() {
  return (
    <div>
      <Header />
      <main className="prose mx-auto my-16 p-6">
        <h1>Services</h1>
        <p>
          West Ealing Timber offers services to support both DIY customers and
          professionals, including bespoke cutting services, expert product
          advice, and project support to help you complete jobs on time and on
          budget.
        </p>
        <h2>What they provide</h2>
        <ul>
          <li>Cut-to-size timber and sheet materials</li>
          <li>Delivery options for trade and retail customers</li>
          <li>Practical advice from experienced staff</li>
        </ul>
      </main>
    </div>
  );
}
