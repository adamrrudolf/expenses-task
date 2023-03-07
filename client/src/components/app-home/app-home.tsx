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
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>
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
