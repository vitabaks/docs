---
sidebar_position: 70
---

# GitOps (CI/CD)

Using Git for cluster configuration management.

:::info
Infrastructure as Code (IaC) allows you to manage and provision infrastructure through code rather than manual processes. GitOps extends this by automating infrastructure updates using a Git workflow with continuous integration (CI) and continuous delivery (CI/CD). When changes are merged into your codebase, the CI/CD pipeline automatically applies these changes to your environment. Any configuration drift, such as manual changes or errors, is corrected by GitOps automation, ensuring the environment matches the desired state as defined in Git.

Learn more about:

- [What is GitOps](https://about.gitlab.com/topics/gitops/)?
- [What is Infrastructure as Code (IaC)](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac)?
:::

After [deploying](/docs/category/deployment) your cluster, you can use the `config_pgcluster.yml` playbook to integrate Git for managing cluster configurations. The automation code and all dependencies are packaged in the Docker image `autobase/automation`, making it easy to integrate into your CI/CD pipelines.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="GitLab" label="GitLab" default>

Examples of GitLab CI/CD configuration files:

#### Simple CI Pipeline

```yaml
stages:
  - test-connect
  - run-playbook

image: autobase/automation:2.3.1

variables:
    ANSIBLE_FORCE_COLOR: 'true'

before_script:
  - cd /autobase/automation/playbooks

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
        --extra-vars "mask_password=true"
```


This CI example assumes the following repository structure:

```
/.gitlab-ci.yml
/group_vars/all.yml
/inventory
/README.md
```

:::info
- **group_vars/all.yml**: Configuration variables — refer to the [default](https://github.com/vitabaks/autobase/blob/2.3.1/automation/roles/common/defaults/main.yml) values. Override them as needed using group_vars, host_vars, or directly in the inventory file.
- **inventory**: Contains a list of servers to manage. See the inventory [example](https://github.com/vitabaks/autobase/blob/master/automation/inventory.example).

The CI pipeline:

	1.	`test-connect`: Tests connectivity to all hosts using ansible ping.
	2.	`run-playbook`: Runs the config_pgcluster.yml playbook, loading variables from the vars folder.
:::


#### Extended CI Pipeline

This extended CI pipeline adds more variable files and a "files" directory, where various files are placed for later copying by Ansible to the managed hosts (if defined in the `copy_files_to_all_server` variable). \
An additional step, "run-check-diff", is introduced to preview the changes that will be applied to the target servers. The "run-playbook" step is triggered manually for better control.

This setup also integrates [Ansible Vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html) for encrypting sensitive data in the secrets.yml file, which is decrypted using the `--vault-password-file` option, with the vault password provided by the `ANSIBLE_VAULT_PASS_FILE` variable. This variable can be defined at the repository level in the CI/CD settings for secure handling of sensitive information.

Additionally, the pipeline includes two important variables:

- `PLAYBOOK`: Allows you to specify the playbook to be used when manually triggering the pipeline. For example, you can set this variable to update_pgcluster.yml to run the update playbook or to any other available playbooks depending on your needs.
- `TAG`: Provides the option to specify tags to run only specific parts of the playbook, improving execution speed by limiting the automation to the necessary sections. For example, you can set this variable to patroni, pgbouncer, or all to control which portion of the playbook gets executed. See the [tags.md](https://github.com/vitabaks/autobase/blob/master/automation/tags.md) file for a list of available tags.

<details>
<summary>Click here to expand...</summary>

```yaml
stages:
  - test-connect
  - run-check-diff
  - run-playbook

image: autobase/automation:2.3.1

variables:
    ANSIBLE_FORCE_COLOR: 'true'
    PLAYBOOK:
      value: "config_pgcluster.yml"
      description: "name of playbook, e.g. config_pgcluster.yml or update_pgcluster.yml"
    TAG:
      value: "all"
      description: "tags for ansible-playbook, e.g. patroni or pgbouncer or all"

before_script:
  - cp -r files/* /autobase/automation/playbooks/files
  - cd /autobase/automation/playbooks

test-connect:
  stage: test-connect
  script:
    - |
      ansible all \
        --inventory $CI_PROJECT_DIR/inventory \
        --vault-password-file $ANSIBLE_VAULT_PASS_FILE \
        --extra-vars "@$CI_PROJECT_DIR/secrets.yml" \
        -m ping

run-check-diff:
  stage: run-check-diff
  script:
    - |
      ansible-playbook $PLAYBOOK \
        --inventory $CI_PROJECT_DIR/inventory \
        --vault-password-file $ANSIBLE_VAULT_PASS_FILE \
        --extra-vars "@$CI_PROJECT_DIR/secrets.yml" \
        --extra-vars "mask_password=true" \
        --tags $TAG \
        --diff --check
  allow_failure: true

run-playbook:
  stage: run-playbook
  script:
    - |
      ansible-playbook $PLAYBOOK \
        --inventory $CI_PROJECT_DIR/inventory \
        --vault-password-file $ANSIBLE_VAULT_PASS_FILE \
        --extra-vars "@$CI_PROJECT_DIR/secrets.yml" \
        --extra-vars "mask_password=true" \
        --tags $TAG
  timeout: 10h
  rules:
    - when: manual
```

</details>

Here’s another example of a CI configuration that manages multiple clusters within a single repository, separated by environments.

<details>
<summary>Click here to expand...</summary>

```yaml
stages:
  - test-connect
  - run-check-diff
  - run-playbook

image: autobase/automation:2.3.1

variables:
  ANSIBLE_FORCE_COLOR: 'true'
  PLAYBOOK:
    value: "config_pgcluster.yml"
    description: "name of playbook, e.g. config_pgcluster.yml or update_pgcluster.yml"
  TAG:
    value: "all"
    description: "tags for ansible-playbook, e.g. patroni or pgbouncer or all"
  ENV:
    value: "staging"
    description: "Target environment (staging or production) for playbook execution."

before_script:
  - cd /autobase/automation/playbooks
  - echo "$ANSIBLE_SSH_PRIVATE_KEY" > ./ansible_ssh_key
  - chmod 600 ./ansible_ssh_key
  - echo "$ANSIBLE_VAULT_PASS" > ./vault_pass
  - chmod 600 ./vault_pass

# Job templates
.test_connect_template: &test_connect_template
  stage: test-connect
  script:
    - |
      ansible all \
        --private-key ./ansible_ssh_key \
        --vault-password-file ./vault_pass \
        --inventory $CI_PROJECT_DIR/$ENV/inventory \
        --extra-vars "@$CI_PROJECT_DIR/$ENV/secrets.yml" \
        -m ping

.run_check_diff_template: &run_check_diff_template
  stage: run-check-diff
  script:
    - |
      ansible-playbook $PLAYBOOK \
        --private-key ./ansible_ssh_key \
        --vault-password-file ./vault_pass \
        --inventory $CI_PROJECT_DIR/$ENV/inventory \
        --extra-vars "@$CI_PROJECT_DIR/$ENV/secrets.yml" \
        --extra-vars "mask_password=true" \
        --tags $TAG \
        --diff --check
  allow_failure: true

.run_playbook_template: &run_playbook_template
  stage: run-playbook
  needs:
    - run-check-diff-staging
    - run-check-diff-production
  script:
    - |
      ansible-playbook $PLAYBOOK \
        --private-key ./ansible_ssh_key \
        --vault-password-file ./vault_pass \
        --inventory $CI_PROJECT_DIR/$ENV/inventory \
        --extra-vars "@$CI_PROJECT_DIR/$ENV/secrets.yml" \
        --extra-vars "mask_password=true" \
        --tags $TAG
  timeout: 10h

# Staging jobs
test-connect-staging:
  <<: *test_connect_template
  variables:
    ENV: staging
  rules:
    - if: '$CI_COMMIT_BRANCH == "master"'
      changes:
        - staging/*
        - staging/group_vars/*
    - if: '$ENV == "staging"'
      when: manual

run-check-diff-staging:
  <<: *run_check_diff_template
  variables:
    ENV: staging
  rules:
    - if: '$CI_COMMIT_BRANCH == "master"'
      changes:
        - staging/*
        - staging/group_vars/*
    - if: '$ENV == "staging"'
      when: manual

run-playbook-staging:
  <<: *run_playbook_template
  variables:
    ENV: staging
  needs:
    - run-check-diff-staging
  rules:
    - if: '$CI_COMMIT_BRANCH == "master"'
      changes:
        - staging/*
        - staging/group_vars/*
    - if: '$ENV == "staging"'
      when: manual

# Production jobs
test-connect-production:
  <<: *test_connect_template
  variables:
    ENV: production
  rules:
    - if: '$CI_COMMIT_TAG =~ /^v(\d+\.)?(\d+\.)?(\d+)$/'
      changes:
        - production/*
        - production/group_vars/*
    - if: '$ENV == "production"'
      when: manual

run-check-diff-production:
  <<: *run_check_diff_template
  variables:
    ENV: production
  rules:
    - if: '$CI_COMMIT_TAG =~ /^v(\d+\.)?(\d+\.)?(\d+)$/'
      changes:
        - production/*
        - production/group_vars/*
    - if: '$ENV == "production"'
      when: manual

run-playbook-production:
  <<: *run_playbook_template
  variables:
    ENV: production
  needs:
    - run-check-diff-production
  rules:
    - if: '$CI_COMMIT_TAG =~ /^v(\d+\.)?(\d+\.)?(\d+)$/'
      changes:
        - production/*
        - production/group_vars/*
    - if: '$ENV == "production"'
      when: manual
```

</details>

  </TabItem>
  <TabItem value="GitHub" label="GitHub" default>

Example of GitHub CI/CD configuration file:

```yaml
name: Autobase

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch: # Allows to run manually

env:
  ANSIBLE_FORCE_COLOR: 'true'

jobs:
  test-connect:
    name: test-connect
    runs-on: ubuntu-latest
    container:
      image: autobase/automation:2.3.1
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup SSH Key and vault pass
        working-directory: /autobase/automation/playbooks
        run: |
          echo "${{ secrets.ANSIBLE_SSH_PRIVATE_KEY }}" | base64 -d > ./ansible_ssh_key
          chmod 600 ./ansible_ssh_key
          echo "${{ secrets.ANSIBLE_VAULT_PASS }}" > ./vault_pass
          chmod 600 ./vault_pass

      - name: Test Connectivity
        working-directory: /autobase/automation/playbooks
        run: |
          ansible all \
            --private-key ./ansible_ssh_key \
            --vault-password-file ./vault_pass \
            --inventory $GITHUB_WORKSPACE/inventory \
            --extra-vars "@$GITHUB_WORKSPACE/secrets.yml" \
            -m ping

  run-playbook:
    name: run-playbook
    needs: test-connect
    runs-on: ubuntu-latest
    container:
      image: autobase/automation:2.3.1
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup SSH Key and vault pass
        working-directory: /autobase/automation/playbooks
        run: |
          echo "${{ secrets.ANSIBLE_SSH_PRIVATE_KEY }}" | base64 -d > ./ansible_ssh_key
          chmod 600 ./ansible_ssh_key
          echo "${{ secrets.ANSIBLE_VAULT_PASS }}" > ./vault_pass
          chmod 600 ./vault_pass

      - name: Run Playbook
        working-directory: /autobase/automation/playbooks
        run: |
          ansible-playbook config_pgcluster.yml \
            --private-key ./ansible_ssh_key \
            --vault-password-file ./vault_pass \
            --inventory $GITHUB_WORKSPACE/inventory \
            --extra-vars "@$GITHUB_WORKSPACE/secrets.yml" \
            --extra-vars "mask_password=true"
```

This CI example assumes the following repository structure:

```
.github/workflows/autobase.yml
/group_vars/all.yml
/secrets.yml
/inventory
/README.md
```

:::info
- **group_vars/all.yml**: Configuration variables — refer to the [default](https://github.com/vitabaks/autobase/blob/2.3.1/automation/roles/common/defaults/main.yml) values. Override them as needed using group_vars, host_vars, or directly in the inventory file.
- **secrets.yml**: (optional) It contains secret data such as passwords encrypted using [Ansible Vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html).
- **inventory**: Contains a list of servers to manage. See the inventory [example](https://github.com/vitabaks/autobase/blob/master/automation/inventory.example).

The CI pipeline:

	1. `test-connect`: Tests connectivity to all hosts using ansible ping.
	2. `run-playbook`: Runs the config_pgcluster.yml playbook, loading variables from the vars folder.
:::

To ensure the correct operation of the CI/CD pipeline, you need to add the following GitHub [secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) to the epository settings:

1. `ANSIBLE_SSH_PRIVATE_KEY`

   - This is the private SSH key used for authentication on target servers.  
     - The corresponding public key must be added to the target servers in `~/.ssh/authorized_keys`.  
     - The private key should be base64-encoded.

2. `ANSIBLE_VAULT_PASS`

   - This is the password used to decrypt secret variables encrypted with [Ansible Vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html).

These secrets will be automatically used in GitHub Actions to test server connectivity and execute Ansible playbook.

  </TabItem>
</Tabs>
