---
sidebar_position: 3
---

# GitOps (CI/CD)

Using Git for cluster configuration management.

:::info
Infrastructure as Code (IaC) allows you to manage and provision infrastructure through code rather than manual processes. GitOps extends this by automating infrastructure updates using a Git workflow with continuous integration (CI) and continuous delivery (CI/CD). When changes are merged into your codebase, the CI/CD pipeline automatically applies these changes to your environment. Any configuration drift, such as manual changes or errors, is corrected by GitOps automation, ensuring the environment matches the desired state as defined in Git.

Learn more about:

- [What is GitOps](https://about.gitlab.com/topics/gitops/)?
- [What is Infrastructure as Code (IaC)](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac)?
:::

After deploying your cluster, you can use the `config_pgcluster.yml` playbook to integrate Git for managing cluster configurations.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="GitLab" label="GitLab" default>

### Simple CI Pipeline Example

```yaml
stages:
  - test-connect
  - run-playbook

image: vitabaks/postgresql_cluster:2.0.0

variables:
    ANSIBLE_FORCE_COLOR: 'true'

before_script:
  - cd /postgresql_cluster/automation

test-connect:
  stage: test-connect
  script:
    - ansible all --inventory $CI_PROJECT_DIR/inventory -m ping

run-playbook:
  stage: run-playbook
  script:
    - |
      ansible-playbook config_pgcluster.yml \
        --inventory $CI_PROJECT_DIR/inventory \
        --extra-vars "@$CI_PROJECT_DIR/vars/main.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/Debian.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/system.yml" \
        --tags $TAG
```


This CI example assumes the following repository structure:

```
/vars
  ├── main.yml
  ├── Debian.yml
  └── system.yml
/.gitlab-ci.yml
/README.md
/inventory
```

:::info
- **inventory**: Contains the list of hosts or servers for Ansible to manage.
- **vars**: Directory with variable files for Ansible.
  - **main.yml**: Base configuration variables.
  - **Debian.yml**: Debian-specific variables.
  - **system.yml**: System-level variables.

The CI pipeline:

	1.	`test-connect`: Tests connectivity to all hosts using ansible ping.
	2.	`run-playbook`: Runs the config_pgcluster.yml playbook, loading variables from the vars folder.
:::


### Extended CI Pipeline Example

This extended CI pipeline adds more variable files and a "files" directory, where various files are placed for later copying by Ansible to the managed hosts (if defined in the `copy_files_to_all_server` variable). \
An additional step, "run-check-diff", is introduced to preview the changes that will be applied to the target servers. The "run-playbook" step is triggered manually for better control.

This setup also integrates [Ansible Vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html) for encrypting sensitive data in the secrets.yml file, which is decrypted using the `--vault-password-file` option, with the vault password provided by the `ANSIBLE_VAULT_PASS_FILE` variable. This variable can be defined at the repository level in the CI/CD settings for secure handling of sensitive information.

Additionally, the pipeline includes two important variables:

- `PLAYBOOK`: Allows you to specify the playbook to be used when manually triggering the pipeline. For example, you can set this variable to update_pgcluster.yml to run the update playbook or to any other available playbooks depending on your needs.
- `TAG`: Provides the option to specify tags to run only specific parts of the playbook, improving execution speed by limiting the automation to the necessary sections. For example, you can set this variable to patroni, pgbouncer, or all to control which portion of the playbook gets executed. See the [tags.md](https://github.com/vitabaks/postgresql_cluster/blob/master/automation/tags.md) file for a list of available tags.

<details>
<summary>Click here to expand...</summary>

```yaml
stages:
  - test-connect
  - run-check-diff
  - run-playbook

image: vitabaks/postgresql_cluster:2.0.0

variables:
    ANSIBLE_FORCE_COLOR: 'true'
    PLAYBOOK:
      value: "config_pgcluster.yml"
      description: "name of playbook, e.g. config_pgcluster.yml or update_pgcluster.yml"
    TAG:
      value: "all"
      description: "tags for ansible-playbook, e.g. patroni or pgbouncer or all"

before_script:
  - cp -r files/* /postgresql_cluster/automation/files
  - cd /postgresql_cluster/automation

test-connect:
  stage: test-connect
  script:
    - |
      ansible all \
        --inventory $CI_PROJECT_DIR/inventory \
        --extra-vars "@$CI_PROJECT_DIR/vars/secrets.yml" \
        --vault-password-file $ANSIBLE_VAULT_PASS_FILE \
        -m ping

run-check-diff:
  stage: run-check-diff
  script:
    - |
      ansible-playbook $PLAYBOOK \
        --inventory $CI_PROJECT_DIR/inventory \
        --extra-vars "@$CI_PROJECT_DIR/vars/main.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/Debian.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/system.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/update.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/upgrade.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/secrets.yml" \
        --vault-password-file $ANSIBLE_VAULT_PASS_FILE \
        --tags $TAG \
        --diff --check
  allow_failure: true

run-playbook:
  stage: run-playbook
  script:
    - |
      ansible-playbook $PLAYBOOK \
        --inventory $CI_PROJECT_DIR/inventory \
        --extra-vars "@$CI_PROJECT_DIR/vars/main.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/Debian.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/system.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/update.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/upgrade.yml" \
        --extra-vars "@$CI_PROJECT_DIR/vars/secrets.yml" \
        --vault-password-file $ANSIBLE_VAULT_PASS_FILE \
        --tags $TAG
  timeout: 10h
  rules:
    - when: manual
```

</details>

  </TabItem>
  <TabItem value="GitHub" label="GitHub" default>

_Examples of GitHub CI/CD configuration files will be provided soon._

:::tip
Refer to [Run Ansible playbook GitHub Action](https://github.com/marketplace/actions/run-ansible-playbook) for more details.
:::

  </TabItem>
</Tabs>
