---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

# Your Own Machines

Deploy on existing servers

:::info
This method is suitable for deployment on existing servers, whether with another cloud provider or in your own data center.
:::

#### Prerequisites

You will need `root` access or a user with `sudo` privileges to access the servers via SSH. You can use your private SSH key (assuming the corresponding public key has already been added to the servers), or a username and password if password access is enabled on your servers.

See also the [Requirements](../overview/requirements.md) and [Compatibility](../overview/compatibility.md) pages.

<Tabs defaultValue="console-ui">
  {/* ===== EXTERNAL TABS: Console (UI) / Command line ===== */}
  <TabItem value="console-ui" label="Console (UI)">

    {/* ===== INTERNAL TAB: Basic ===== */}
    <Tabs defaultValue="basic">
      <TabItem value="basic" label="Basic">
        Select **Your Own Machines** in the deployment destination.

        <ThemedImage
          alt="deployment-destination"
          sources={{
            light: '/img/deployment-destination-server.png',
            dark: '/img/deployment-destination-server.dark.png',
          }}
        />

        Specify the name and IP addresses of your servers. Example:

        <ThemedImage
          alt="database-servers"
          sources={{
            light: '/img/database-servers.png',
            dark: '/img/database-servers.dark.png',
          }}
        />

        :::warning
        Please note that at least 3 servers are required to ensure high availability.
        :::

        Select authentication method.

        <ThemedImage
          alt="authentication-method"
          sources={{
            light: '/img/authentication-method.png',
            dark: '/img/authentication-method.dark.png',
          }}
        />

        Optionally, specify an IP address to provide a single entry point for client access to databases in the cluster. Example:

        <ThemedImage
          alt="cluster-vip"
          sources={{
            light: '/img/cluster-vip.png',
            dark: '/img/cluster-vip.dark.png',
          }}
        />

        :::info
        This must be an IP address that is currently unused on your network. The address will be assigned to the cluster after deployment.
          :::note
          Not for cloud environments. Because VIP-based solutions like `keepalived` or `vip-manager` may not works in such environments.
        :::

        Optionally, check the box for "HAProxy load balancer".

        <ThemedImage
          alt="haproxy-load-balancer"
          sources={{
            light: '/img/haproxy-load-balancer.png',
            dark: '/img/haproxy-load-balancer.dark.png',
          }}
        />

        :::tip
        This feature supports load balancing for read operations, facilitating effective scale-out strategies through the use of read-only replicas.
        See the details on the [Architecture](https://postgresql-cluster.org/overview/architecture#2-postgresql-high-availability-with-load-balancing) page
        :::

        Choose which environment your database cluster belongs to.

        <ThemedImage
          alt="environment"
          sources={{
            light: '/img/environment.png',
            dark: '/img/environment.dark.png',
          }}
        />

        Specify a name for your cluster.

        <ThemedImage
          alt="cluster-name"
          sources={{
            light: '/img/cluster-name.png',
            dark: '/img/cluster-name.dark.png',
          }}
        />

        Optionally, specify a description.

        <ThemedImage
          alt="description"
          sources={{
            light: '/img/description.png',
            dark: '/img/description.dark.png',
          }}
        />

        Select the PostgreSQL version to install.

        <ThemedImage
          alt="postgres-version"
          sources={{
            light: '/img/postgres-version.png',
            dark: '/img/postgres-version.dark.png',
          }}
        />

        Review the summary and click the "Create Cluster" button.

        <ThemedImage
          alt="summary"
          sources={{
            light: '/img/summary-server.png',
            dark: '/img/summary-server.dark.png',
          }}
          style={{ width: '40%' }}
        />
      </TabItem>

    {/* ===== INTERNAL TAB: Expert ===== */}
      <TabItem value="expert" label="Expert Mode">
        This mode unlocks advanced settings for fine-tuning clusters, including options hidden in standard mode. \
        Designed for experienced users.

        :::info
        To use **Expert Mode**, go to the **Settings** page and turn on “Enable expert mode”. \
        *(available since Autobase 2.5.0)*
        :::

        Select **Your Own Machines** in the deployment destination.

        <ThemedImage
          alt="deployment-destination"
          sources={{
            light: '/img/deployment-destination-server.png',
            dark: '/img/deployment-destination-server.dark.png',
          }}
        />

        Specify the name and IP addresses of your servers. Example:

        <ThemedImage
          alt="database-servers"
          sources={{
            light: '/img/database-servers.expert-mode.png',
            dark: '/img/database-servers.expert-mode.dark.png',
          }}
        />

        :::warning
        Please note that at least 3 servers are required to ensure high availability.
        
        This requirement applies to the number of DCS servers (see [RAFT](http://thesecretlivesofdata.com/raft/) protocol), the database cluster itself may consist of two servers.
        :::

        :::tip
        We also support converting standalone PostgreSQL installation into a high-availability cluster.
        To do this, check the box "Postgres exists" above the server where the database is already present.
        :::

        Select the DCS type (etcd or consul) and where it will be installed, or use an existing DCS cluster.

        <ThemedImage
          alt="dcs"
          sources={{
            light: '/img/dcs.expert-mode.png',
            dark: '/img/dcs.expert-mode.dark.png',
          }}
        />

        Select authentication method.

        <ThemedImage
          alt="authentication-method"
          sources={{
            light: '/img/authentication-method.png',
            dark: '/img/authentication-method.dark.png',
          }}
        />

        Optionally, specify an IP address to provide a single entry point for client access to databases in the cluster. Example:

        <ThemedImage
          alt="cluster-vip"
          sources={{
            light: '/img/cluster-vip.png',
            dark: '/img/cluster-vip.dark.png',
          }}
        />

        :::info
        This must be an IP address that is currently unused on your network. The address will be assigned to the cluster after deployment.
          :::note
          Not for cloud environments. Because VIP-based solutions like `keepalived` or `vip-manager` may not works in such environments.
        :::

        Optionally, check the box for "HAProxy load balancer". Choose where to install — on DB servers or dedicated ones.

        <ThemedImage
          alt="haproxy-load-balancer"
          sources={{
            light: '/img/haproxy-load-balancer.expert-mode.png',
            dark: '/img/haproxy-load-balancer.expert-mode.dark.png',
          }}
        />

        :::tip
        This feature supports load balancing for read operations, facilitating effective scale-out strategies through the use of read-only replicas.
        See the details on the [Architecture](https://postgresql-cluster.org/overview/architecture#2-postgresql-high-availability-with-load-balancing) page
        :::

        Choose which environment your database cluster belongs to.

        <ThemedImage
          alt="environment"
          sources={{
            light: '/img/environment.png',
            dark: '/img/environment.dark.png',
          }}
        />

        Specify a name for your cluster.

        <ThemedImage
          alt="cluster-name"
          sources={{
            light: '/img/cluster-name.png',
            dark: '/img/cluster-name.dark.png',
          }}
        />

        Optionally, specify a description.

        <ThemedImage
          alt="description"
          sources={{
            light: '/img/description.png',
            dark: '/img/description.dark.png',
          }}
        />

        Select the PostgreSQL version to install.

        <ThemedImage
          alt="postgres-version"
          sources={{
            light: '/img/postgres-version.png',
            dark: '/img/postgres-version.dark.png',
          }}
        />

        Optionally, specify the custom path to the data directory.

        <ThemedImage
          alt="data-directory"
          sources={{
            light: '/img/data-directory.expert-mode.png',
            dark: '/img/data-directory.expert-mode.dark.png',
          }}
        />


        Specify the desired database name, username, and user password.

        <ThemedImage
          alt="databases"
          sources={{
            light: '/img/databases.expert-mode.png',
            dark: '/img/databases.expert-mode.dark.png',
          }}
        />

        Optionally, specify connection pools for your databases, its size and mode.

        <ThemedImage
          alt="connection-pools"
          sources={{
            light: '/img/connection-pools.expert-mode.png',
            dark: '/img/connection-pools.expert-mode.dark.png',
          }}
        />

        :::info Available pool modes
          - **session** - Server is released back to pool after client disconnects.
          - **transaction** - Server is released back to pool after transaction finishes. Recomended.
          - **statement** - Server is released back to pool after query finishes. Transactions spanning multiple statements are disallowed in this mode.
        :::

        Enable the necessary extensions for your databases.

        <ThemedImage
          alt="extensions"
          sources={{
            light: '/img/extensions.expert-mode.png',
            dark: '/img/extensions.expert-mode.dark.png',
          }}
        />

        :::tip
        This list includes all contrib extensions and some popular third-party ones. However, [more than 400 extensions are available](/docs/extensions/list). \
        To install others, specify the [installation parameters](/docs/extensions/install) manually on the **YAML** tab.
        :::

        Configure backup settings.

        <ThemedImage
          alt="backups"
          sources={{
            light: '/img/backups.expert-mode.png',
            dark: '/img/backups.expert-mode.dark.png',
          }}
        />

        :::info
        Click **Configure** button and specify them in the usual key=value format.
          :::note
          For pgBackRest, you can specify the global section options — the stanza section will be populated automatically.
        :::

        Optionally, specify the Postgres and kernel parameters.

        <ThemedImage
          alt="postgres-kernel-parameters"
          sources={{
            light: '/img/postgres-kernel-parameters.expert-mode.png',
            dark: '/img/postgres-kernel-parameters.expert-mode.dark.png',
          }}
        />

        :::info
        By default, Autobase automatically configures these parameters. See the default settings for [Postgres](https://github.com/vitabaks/autobase/blob/2.5.0/automation/roles/common/defaults/main.yml#L331) and the [kernel](https://github.com/vitabaks/autobase/blob/2.5.0/automation/roles/common/defaults/main.yml#L889). \
        If you prefer to set the parameters manually, click **Configure** button and specify them in the usual key=value format.
        :::

        Example for Postgres parameters:

        <ThemedImage
          alt="postgres-parameters-example"
          sources={{
            light: '/img/postgres-parameters-example.expert-mode.png',
            dark: '/img/postgres-parameters-example.expert-mode.dark.png',
          }}
        />

        Example for Kernel parameters:

        <ThemedImage
          alt="kernel-parameters-example"
          sources={{
            light: '/img/kernel-parameters-example.expert-mode.png',
            dark: '/img/kernel-parameters-example.expert-mode.dark.png',
          }}
        />

        Optionally, specify the Additional settings.

        <ThemedImage
          alt="additional-settings"
          sources={{
            light: '/img/additional-settings-server.expert-mode.png',
            dark: '/img/additional-settings-server.expert-mode.dark.png',
          }}
        />

        :::tip
        Use the hint (?) icon for a more detailed description of each option.
        :::

        Review the summary and click the "Create Cluster" button.

        <ThemedImage
          alt="summary"
          sources={{
            light: '/img/summary-server.png',
            dark: '/img/summary-server.dark.png',
          }}
          style={{ width: '40%' }}
        />
      </TabItem>

    {/* ===== INTERNAL TAB: YAML ===== */}
      <TabItem value="yaml" label="YAML tab">
        The YAML editor allows you to specify any parameters that were previously available only in command-line mode. \
        Designed for experienced users.

        :::info
        To use the **YAML** tab, go to the **Settings** page and turn on “Enable expert mode” and “Enable YAML tab”. \
        *(available since Autobase 2.5.0)*
        :::

        <ThemedImage
          alt="cluster"
          sources={{
            light: '/img/yaml-tab-server.png',
            dark: '/img/yaml-tab-server.dark.png',
          }}
        />

        Autobase offers a wide range of functionality, and not all options can be fully represented in UI forms. That’s why we added a YAML editor — it allows you to set any parameters supported by Autobase. You can see available parameters [here](https://github.com/vitabaks/autobase/blob/2.5.0/automation/roles/common/defaults/main.yml).

        Make the necessary changes and click the **"Create Cluster"** button.
      </TabItem>
    </Tabs>

    {/* ===== COMMON BLOCK (Basic / Expert / YAML) ===== */}

        Wait until deployment is complete. This process takes about 10 minutes.

        :::info
        You can see the deployment log in the "Operations" section. To do this, select the relevant event with the "deploy" type and click "Show details" under the Actions tab.
        :::

        :::tip
        After a successful deployment, you can obtain the connection info on the cluster page. To do this, click on the name of your cluster on the "Clusters" page.
        :::

        <ThemedImage
          alt="сluster"
          sources={{
            light: '/img/сluster.png',
            dark: '/img/сluster.dark.png',
          }}
        />

        Example of a cluster page:

        <ThemedImage
          alt="cluster-overview"
          sources={{
            light: '/img/cluster-overview.png',
            dark: '/img/cluster-overview.dark.png',
          }}
        />
  </TabItem>

  {/* ===== EXTERNAL TAB: Command line ===== */}
  <TabItem value="command-line" label="Command line">
    :::tip
    📩 Contact us at info@autobase.tech, and our team will provide you with deployment instructions tailored specifically to your infrastructure, including the most suitable parameters for optimal performance and reliability.
    :::

    #### Prepare your inventory

    ```
    curl -fsSL \
      https://raw.githubusercontent.com/vitabaks/autobase/refs/tags/2.5.0/automation/inventory.example \
      --output ./inventory
    ```

    Specify IP addresses and appropriate connection settings for your environment, such as ansible_user, ansible_ssh_pass, or ansible_ssh_private_key_file.

    ```
    nano ./inventory
    ```

    #### Prepare your variables

    Refer to the default [variables](https://github.com/vitabaks/autobase/blob/2.5.0/automation/roles/common/defaults/main.yml) for all configurable options. Override them as needed using group_vars, host_vars, or directly in the inventory file. 

    ```
    mkdir -p ./group_vars
    nano ./group_vars/all.yml
    ```

    #### Run the deployment command

    ```
    docker run --rm -it \
      -e ANSIBLE_SSH_ARGS="-F none" \
      -e ANSIBLE_INVENTORY=/project/inventory \
      -v $PWD:/project \
      -v $HOME/.ssh:/root/.ssh \
      autobase/automation:2.5.0 \
        ansible-playbook deploy_pgcluster.yml
    ```

    Alternatively, you can use [Ansible Collection](https://github.com/vitabaks/autobase/blob/master/automation/README.md)

    #### Wait until deployment is complete

    This process takes about 10 to 15 minutes.

    :::tip
    After a successful deployment, the connection information can be found in the Ansible log.
    :::

    #### How to start from scratch:

    If you need to start from scratch, you can use the `remove_cluster.yml` playbook.

    <details>
    <summary>Click here to expand...</summary>

    Run the following command to remove the specified components:

    ```
    docker run --rm -it \
      -e ANSIBLE_SSH_ARGS="-F none" \
      -e ANSIBLE_INVENTORY=/project/inventory \
      -v $PWD:/project \
      -v $HOME/.ssh:/root/.ssh \
      autobase/automation:2.5.0 \
        ansible-playbook remove_cluster.yml -e "remove_postgres=true remove_etcd=true"
    ```

    This command will delete the specified components, allowing you to start a new installation.

    Available variables:
    - `remove_postgres`: stop the PostgreSQL service and remove data.
    - `remove_etcd`: stop the ETCD service and remove data.
    - `remove_consul`: stop the Consul service and remove data.

    :::warning
    **Caution:** be careful when running this command in a production environment.
    :::

    </details>

    :::info
    We also support converting standalone PostgreSQL installation into a high-availability cluster. If you want to upgrade your current PostgreSQL setup to a clustered configuration, simply set `postgresql_exists=true` in the inventory file.
    :::note
    Please note that during the cluster setup process, your existing PostgreSQL service will be automatically restarted, leading to a brief period of database downtime. Plan this transition accordingly.
    :::
  </TabItem>
</Tabs>
