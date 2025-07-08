# GlaessesWebV5

The GitHub repository for the Glaesses website.

This project is built with SvelteKit and is configured to be developed and run using Docker.

## Local Development

1.  **Install dependencies:**
    This command installs the necessary packages for the project.
    ```bash
    npm install
    ```

2.  **Start the development server:**
    This command builds the Docker container and starts the local server.
    ```bash
    docker compose up --build
    ```

    **Note:** The standard `npm run dev` command is not configured for this setup.

## Building and Deployment

This project is set up for automatic deployment. The build process is handled by a CI/CD pipeline (e.g., GitHub Actions) when changes are pushed.

1.  **Create a branch** for your changes.
2.  **Commit and push** your work to that branch.
3.  **Open a Pull Request** to merge your changes into the `main` branch.

Once the Pull Request is approved and merged, the website will be built and deployed automatically.

Because of this automated process, running `npm run build` or `npm run preview` locally is not part of the standard workflow.