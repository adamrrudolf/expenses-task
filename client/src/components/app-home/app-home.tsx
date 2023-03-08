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
            await fetch('http://localhost:8081/addExpense', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, amount, date }),
            });
            // reload expenses
            const response = await fetch('http://localhost:8081/data')
            const data = await response.json();
            this.expenses = data;
          }}
        >
          <label>
            Name
            </label>
            <input type="text" name="name" />
          <label>
            Amount
            </label>
            <input type="number" name="amount" />
          <label>
            Date
            </label>
            <input type="date" name="date" />
          <button type="submit">Add expense</button>
        </form>
        {/* render expenses: name, amount, date */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              {/* invisible column for actions */}
              <th></th>
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
                  {/* add delete button */}
                  <td class="actions">
                    <button
                      onClick={async () => {
                        await fetch(`http://localhost:8081/deleteExpense?id=${id}`, {
                          method: 'DELETE',
                        });
                        // reload expenses
                        const response = await fetch('http://localhost:8081/data')
                        const data = await response.json();
                        this.expenses = data;
                      }}
                    >
                      Delete
                    </button>
                    {/* open dialog on update */}
                    <dialog>
                      <form class="update-form"
                        onSubmit={async (event) => {
                          const formData = new FormData(event.target as HTMLFormElement);
                          const name = formData.get('name');
                          const amount = formData.get('amount');
                          const date = formData.get('date');
                          await fetch(`http://localhost:8081/updateExpense?id=${id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name, amount, date }),
                          });
                          const response = await fetch('http://localhost:8081/data')
                          const data = await response.json();
                          this.expenses = data;
                          event.target['closest']('dialog').close();

                        }
                        }
                      >
                        <label>
                          Names
                          </label>
                          <input type="text" name="name" />
                        <label>
                          Amount
                          </label>
                          <input type="number" name="amount" />
                        <label>
                          Date
                          </label>
                          <input type="date" name="date" />
                        {/* close dialog button */}
                        <button class="cancel-button" type="button" onClick={(event) => {
                          event.target['closest']('dialog').close();
                        }}>Cancel</button>
                        <button type="submit">Update</button>
                      </form>
                    </dialog>
                    <button onClick={(event) => {
                      event.target['closest']('tr').querySelector('dialog').showModal();
                    }}>Update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
