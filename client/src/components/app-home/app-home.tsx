import { Component, h, State } from '@stencil/core';


interface Expenses {
  [key: string]: {
    name: string;
    amount: number;
    date: string;
  };
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  // expenses is object with id as keys
  @State() expenses: Expenses = {};

  async componentWillLoad() {
    const response = await fetch('http://localhost:8081/data')
    const data = await response.json();
    this.expenses = data;
  }


  render() {
    return (
      <div class="app-home">
        {/* add expense UI to POST to localhost:8081/addExpense */}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const name = formData.get('name');
            const amount = formData.get('amount');
            const date = formData.get('date');
            const id = formData.get('id');
            await fetch('http://localhost:8081/addExpense', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, amount, date, id }),
            });
            // reload expenses
            const response = await fetch('http://localhost:8081/data')
            const data = await response.json();
            this.expenses = data;
          }}
        >
          <label>
            Name
            <input type="text" name="name" />
          </label>
          <label>
            Amount
            <input type="number" name="amount" />
          </label>
          <label>
            Date
            <input type="date" name="date" />
          </label>
          <button type="submit">Add expense</button>
        </form>
        {/* render expenses: name, amount, date */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.expenses).map((id) => {
              const expense = this.expenses[id];
              return (
                <tr>
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
