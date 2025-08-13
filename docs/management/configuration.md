---
sidebar_position: 20
---

# Configuration

This section guides you through the process of changes your PostgreSQL cluster configuration.

### Console (UI)

Cluster configuration changes are currently supported only through the command line.

:::tip
If you’re interested in having this functionality available through the UI, please consider becoming a [sponsor](/docs/sponsor).
:::

### Command line

To change the PostgreSQL configuration in a cluster using automation:

1. Modify the desired parameters (e.g., `postgresql_parameters`). Refer to the [default](https://github.com/vitabaks/autobase/blob/2.3.1/automation/roles/common/defaults/main.yml) values - override them as needed using group_vars, host_vars, or directly in the inventory file. 
2. Run the `config_pgcluster.yml` playbook to apply the changes.

Example:
```
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/project/inventory \
  -v $PWD:/project \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.3.1 \
    ansible-playbook config_pgcluster.yml
```

:::note
Optionally, set `pending_restart: true` to automatically restart PostgreSQL if the parameter change requires a restart.
:::

:::info
You can use GitOps and [CI/CD](gitops.md) pipelines to manage PostgreSQL configuration in a fully automated and reproducible way.
:::
