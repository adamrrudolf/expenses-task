import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})

export class AppRoot {

  // implement dark mode toggle

  onCheckboxChange() {
    // toggle dark mode
    const body = document.querySelector('body');
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
    } else {
      body.classList.add('dark');
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Expenses manager with Stencil. To check out the code, go to <a href="https://github.com/adamrrudolf/expenses-task">Github</a></h1>
          <div class="theme-switch-wrapper">
            <label class="theme-switch" htmlFor="checkbox">
            </label>
            <input type="checkbox" id="checkbox" onChange={() => this.onCheckboxChange()} />
            <em>Dark mode</em>
          </div>
        </header>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
