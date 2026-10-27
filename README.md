\# PlaceTrack – Placement Preparation Tracker



\## 1. Introduction and Objective



PlaceTrack is a web-based placement preparation tracker designed to help students organize their placement preparation activities and monitor their progress. It provides a simple interface for managing preparation tasks and tracking progress. This project demonstrates website development, version control using Git and GitHub, and continuous integration using Jenkins.



\## 2. Technology Stack



| Component | Technology |

|---|---|

| Frontend | HTML, CSS, JavaScript |

| Version Control | Git |

| Remote Repository | GitHub |

| DevOps Tool | Jenkins |

| Development Environment | Windows |

| Containerization | Docker (if implemented) |



\## 3. Website Preview



The following screenshot shows the PlaceTrack website interface.



!\[PlaceTrack Website Interface](screenshots/stage6\_web.png)



\*Figure 1: PlaceTrack website interface.\*



\## 4. Features



\- Placement preparation task management.

\- Task priorities and progress tracking, if implemented.

\- Simple and user-friendly website interface.

\- Version control and project history using Git.

\- Remote repository hosting using GitHub.

\- Continuous integration using Jenkins.



\*Note: Keep only the features that are actually implemented in your website.\*



\## 5. How to Run the Website



1\. Clone the GitHub repository:



&#x20;  ```bash

&#x20;  git clone https://github.com/Pranali-28/PlaceTrack.git

&#x20;  ```



2\. Open the downloaded project folder.

3\. Open `index.html` in your web browser.



If your project contains a configured Node.js test script, run:



```bash

npm test

```



If your project contains a configured build script, run:



```bash

npm run build

```



\## 6. Changes Made and Git Workflow



Git was used to track changes made during website development. GitHub was used to host the project repository and maintain the project's commit history.



!\[Git Commit History](screenshots/stage7\_commit.png)



\*Figure 2: Git commit history showing project development.\*



\### Git Commands Used



The following are common Git commands used during project development. Retain only the commands that you actually ran.



```bash

git status

git add .

git commit -m "Update website"

git log --oneline

git push origin main

```



\*\*GitHub Repository:\*\*  

https://github.com/Pranali-28/PlaceTrack



\## 7. Jenkins Integration



Jenkins was used to configure and execute a continuous integration pipeline for the project.



\### Steps Followed



1\. Opened Jenkins and created a Pipeline job.

2\. Configured the project repository and branch, if using Pipeline from SCM.

3\. Specified the `Jenkinsfile` path, if configured.

4\. Executed the pipeline.

5\. Checked the build status and console output.



\### Jenkins Pipeline Configuration



The pipeline configuration connects Jenkins to the project repository and defines how the pipeline is executed.



!\[Jenkins Pipeline Configuration](screenshots/jenkins1.png)



\*Figure 3: Jenkins pipeline configuration.\*



\### Jenkins Build Results



The build results screen shows the outcome of the Jenkins pipeline execution.



!\[Jenkins Build Results](screenshots/jenkins2.png)



\*Figure 4: Jenkins build results.\*



\### Pipeline Explanation



Explain the stages that are actually configured in your `Jenkinsfile`. Depending on your implementation, these may include:



\- \*\*Checkout:\*\* Retrieves the project source code from the repository.

\- \*\*Validation:\*\* Checks that required project files are present.

\- \*\*Testing:\*\* Runs configured tests, if available.

\- \*\*Build:\*\* Executes the configured build process, if available.

\- \*\*Archive:\*\* Saves build artifacts, if configured.



\## 8. Conclusion



PlaceTrack demonstrates the development of a placement preparation tracking website and the application of version control and DevOps practices. Through this project, practical experience is gained in web development, Git, GitHub, and Jenkins pipeline integration.





