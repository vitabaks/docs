---
sidebar_position: 2
---

# Configuration

This section guides you through the process of changes your PostgreSQL cluster configuration.

### Console (UI)

Changing the cluster configuration through the UI is not yet implemented.

:::tip
If you're interested in this feature, please consider becoming a [sponsor](../sponsor.md).
:::

### Command line

To change the PostgreSQL configuration in a cluster using automation:

1. Modify the desired parameters in the variable file (e.g., `postgresql_parameters`).
2. Run the `config_pgcluster.yml` playbook to apply the changes.

```
ansible-playbook config_pgcluster.yml
```

:::note
Optionally, set `pending_restart: true` to automatically restart PostgreSQL if the parameter change requires a restart.
:::

### GitOps (CI/CD)

**Using Git for cluster configuration management**.

:::info
Infrastructure as Code (IaC) allows you to manage and provision infrastructure through code rather than manual processes. GitOps extends this by automating infrastructure updates using a Git workflow with continuous integration (CI) and continuous delivery (CI/CD). When changes are merged into your codebase, the CI/CD pipeline automatically applies these changes to your environment. Any configuration drift, such as manual changes or errors, is corrected by GitOps automation, ensuring the environment matches the desired state as defined in Git.

Learn more about:

- [What is GitOps](https://about.gitlab.com/topics/gitops/)?
- [What is Infrastructure as Code (IaC)](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac)?
:::

After deploying your cluster, you can use the `config_pgcluster.yml` playbook to integrate Git for managing cluster configurations. Refer to [Run Ansible playbook GitHub Action](https://github.com/marketplace/actions/run-ansible-playbook) and a GitLab CI/CD [example](https://medium.com/geekculture/how-to-run-an-ansible-playbook-using-gitlab-ci-cd-2135f76d7f1e) for more details.

_Examples of GitHub and GitLab CI/CD configuration files will be provided soon._
