---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

# Azure

Microsoft Azure

**[Autobase](https://github.com/vitabaks/autobase)** will automatically set up the following in Azure:

1. Azure Virtual Machines (with a dedicated data disk), with all cluster components installed and configured.
2. Azure Load Balancer to serve as the entry point for database connections.
3. Azure Blob Storage, and configured backups using pgBackRest.

:::info
All components are installed within your cloud account.
:::

#### Prerequisites

You will need the necessary details (AZURE_SUBSCRIPTION_ID, AZURE_CLIENT_ID, AZURE_SECRET, AZURE_TENANT) to deploy the cluster to your Azure account.
See the [official documentation](https://learn.microsoft.com/en-us/azure/developer/ansible/create-ansible-service-principal?tabs=azure-cli) for instructions on creating an service principal.

:::note
You can either add these credentials in advance on the **Settings** page under the **Secrets** tab, or you will be prompted to enter them during the cluster creation process.
:::

<Tabs defaultValue="console-ui">
  {/* ===== EXTERNAL TABS: Console (UI) / Command line ===== */}
  <TabItem value="console-ui" label="Console (UI)">

    {/* ===== INTERNAL TAB: Basic ===== */}
    <Tabs defaultValue="basic">
      <TabItem value="basic" label="Basic">
        Select **Azure** as the destination and choose the deployment region.

        <ThemedImage
          alt="deployment-destination"
          sources={{
            light: '/img/deployment-destination-azure.png',
            dark: '/img/deployment-destination-azure.dark.png',
          }}
        />

        <ThemedImage
          alt="cloud-region"
          sources={{
            light: '/img/cloud-region-azure.png',
            dark: '/img/cloud-region-azure.dark.png',
          }}
        />

        Select the type of server with the required amount of CPU and RAM.

        <ThemedImage
          alt="instance-type"
          sources={{
            light: '/img/instance-type-azure.png',
            dark: '/img/instance-type-azure.dark.png',
          }}
        />

        Select the number of servers to be created for the PostgreSQL cluster.

        :::warning
        Please note that at least 3 servers are required to ensure high availability.
        :::
        
        <ThemedImage
          alt="number-of-instances"
          sources={{
            light: '/img/number-of-instances.png',
            dark: '/img/number-of-instances.dark.png',
          }}
        />

        Specify the desired disk size for the database.

        <ThemedImage
          alt="data-disk-storage"
          sources={{
            light: '/img/data-disk-storage-azure.png',
            dark: '/img/data-disk-storage-azure.dark.png',
          }}
        />

        Specify your SSH public key to be able to access the database servers via SSH after deployment.

        <ThemedImage
          alt="ssh-public-key"
          sources={{
            light: '/img/ssh-public-key.png',
            dark: '/img/ssh-public-key.dark.png',
          }}
        />

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

        Review the summary and click the **"Create Cluster"** button.

        <ThemedImage
          alt="summary"
          sources={{
            light: '/img/summary-azure.png',
            dark: '/img/summary-azure.dark.png',
          }}
          style={{ width: '35%' }}
        />
      </TabItem>

    {/* ===== INTERNAL TAB: Expert ===== */}
      <TabItem value="expert" label="Expert Mode">
        This mode unlocks advanced settings for fine-tuning clusters, including options hidden in standard mode. \
        Designed for experienced users.

        :::info
        To use **Expert Mode**, go to the **Settings** page and turn on “Enable expert mode”. \
        *(available since Autobase 2.5)*
        :::

        Select **Azure** as the destination and choose the deployment region.

        <ThemedImage
          alt="deployment-destination"
          sources={{
            light: '/img/deployment-destination-azure.png',
            dark: '/img/deployment-destination-azure.dark.png',
          }}
        />

        <ThemedImage
          alt="cloud-region"
          sources={{
            light: '/img/cloud-region-azure.png',
            dark: '/img/cloud-region-azure.dark.png',
          }}
        />

        Select the type of server with the required amount of CPU and RAM.

        :::tip
        If the required instance type is not listed, you can specify it in the **CUSTOM** tab. \
        Make sure it follows the format supported by the Azure API (e.g., `Standard_D8s_v5`).
        :::

        <ThemedImage
          alt="instance-type"
          sources={{
            light: '/img/instance-type-azure.expert-mode.png',
            dark: '/img/instance-type-azure.expert-mode.dark.png',
          }}
        />

        Select the number of servers to be created for the PostgreSQL cluster.

        :::warning
        Please note that at least 3 servers are required to ensure high availability.
        :::

        <ThemedImage
          alt="number-of-instances"
          sources={{
            light: '/img/number-of-instances.expert-mode.png',
            dark: '/img/number-of-instances.expert-mode.dark.png',
          }}
        />

        :::info
        **Spot instances** can be used if needed.
        :::note not permanent
        Spot instances are 60–90% cheaper than standard ones, making them great for testing. \
        However, they are not suitable for production because the cloud provider can terminate them at any time to reclaim capacity.
        :::

        Specify the desired disk size for the database, along with the volume type and file system type (ext4, xfs, zfs).

        <ThemedImage
          alt="data-disk-storage"
          sources={{
            light: '/img/data-disk-storage-azure.expert-mode.png',
            dark: '/img/data-disk-storage-azure.expert-mode.dark.png',
          }}
        />

        If needed, specify the Network name to which the database servers will be added. If not specified, a new network will be created.

        <ThemedImage
          alt="data-disk-storage"
          sources={{
            light: '/img/network.expert-mode.png',
            dark: '/img/network.expert-mode.dark.png',
          }}
        />

        Specify your SSH public key to be able to access the database servers via SSH after deployment.

        <ThemedImage
          alt="ssh-public-key"
          sources={{
            light: '/img/ssh-public-key.png',
            dark: '/img/ssh-public-key.dark.png',
          }}
        />

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

        Configure backup settings such as the start time and retention period.

        <ThemedImage
          alt="backups"
          sources={{
            light: '/img/backups.expert-mode.png',
            dark: '/img/backups.expert-mode.dark.png',
          }}
        />

        :::info
        By default, Autobase automatically configures the settings for the selected backup tool. \
        If you prefer to set the parameters manually, click **Configure** button and specify them in the usual key=value format.
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
        By default, Autobase automatically configures these parameters. See the default settings for [Postgres](https://github.com/vitabaks/autobase/blob/2.5.2/automation/roles/common/defaults/main.yml#L331) and the [kernel](https://github.com/vitabaks/autobase/blob/2.5.2/automation/roles/common/defaults/main.yml#L889). \
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
            light: '/img/additional-settings.expert-mode.png',
            dark: '/img/additional-settings.expert-mode.dark.png',
          }}
        />

        :::tip
        Use the hint (?) icon for a more detailed description of each option.
        :::

        Review the summary and click the **"Create Cluster"** button.

        <ThemedImage
          alt="summary"
          sources={{
            light: '/img/summary-azure.png',
            dark: '/img/summary-azure.dark.png',
          }}
          style={{ width: '35%' }}
        />

      </TabItem>

    {/* ===== INTERNAL TAB: YAML ===== */}
      <TabItem value="yaml" label="YAML tab">
        The YAML editor allows you to specify any parameters that were previously available only in command-line mode. \
        Designed for experienced users.

        :::info
        To use the **YAML** tab, go to the **Settings** page and turn on “Enable expert mode” and “Enable YAML tab”. \
        *(available since Autobase 2.5)*
        :::

        <ThemedImage
          alt="cluster"
          sources={{
            light: '/img/yaml-tab-azure.png',
            dark: '/img/yaml-tab-azure.dark.png',
          }}
        />

        Autobase offers a wide range of functionality, and not all options can be fully represented in UI forms. That’s why we added a YAML editor — it allows you to set any parameters supported by Autobase. You can see available parameters [here](https://github.com/vitabaks/autobase/blob/2.5.2/automation/roles/cloud_resources/defaults/main.yml) (for cloud resources) and [here](https://github.com/vitabaks/autobase/blob/2.5.2/automation/roles/common/defaults/main.yml) (for cluster settings).

        Make the necessary changes and click the **"Create Cluster"** button.
      </TabItem>
    </Tabs>

    {/* ===== COMMON BLOCK (Basic / Expert / YAML) ===== */}

    Wait until deployment is complete. This process takes about **10 to 15 minutes**.

    :::info
    You can see the deployment log in the **"Operations"** page.  
    Select the relevant event with the **"deploy"** type and click **"Show details"** under the *Actions* tab.
    :::

    :::tip
    After a successful deployment, you can obtain the connection info on the cluster page.  
    Click on the name of your cluster on the **"Clusters"** page.
    :::

    <ThemedImage
      alt="cluster"
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

  #### 1. Set Azure credentials

  Export your Azure service principal credentials to an environment variable:

  ```
  export AZURE_SUBSCRIPTION_ID=<value>
  export AZURE_CLIENT_ID=<value>
  export AZURE_SECRET=<value>
  export AZURE_TENANT=<value>
  ```

  #### 2. Run the Deployment Command

  Execute the following command to deploy a PostgreSQL cluster (example):

  ```
  docker run --rm -it \
    --env AZURE_SUBSCRIPTION_ID=${AZURE_SUBSCRIPTION_ID} \
    --env AZURE_CLIENT_ID=${AZURE_CLIENT_ID} \
    --env AZURE_SECRET=${AZURE_SECRET} \
    --env AZURE_TENANT=${AZURE_TENANT} \
    autobase/automation:2.5.2 \
      ansible-playbook deploy_pgcluster.yml --extra-vars \
        "ansible_user=azureadmin \
        cloud_provider='azure' \
        cloud_load_balancer=true \
        server_count=3 \
        server_type='Standard_D4s_v5' \
        server_location='eastus' \
        volume_size=100 \
        postgresql_version=18 \
        patroni_cluster_name='postgres-cluster-01' \
        ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
  ```

  Key Parameters:
  - `cloud_provider`: Specifies Azure as the provider.
  - `cloud_load_balancer`: Adds a Azure Load Balancer to the cluster.
  - `server_count`: Number of servers in the cluster (at least 3 servers are needed for high availability).
  - `server_type`: Type of servers (e.g., 'Standard_D4s_v5' for 4 vCPU 16 GB RAM).
  - `server_location`: Server location (e.g., 'eastus' for East US Virginia).
  - `volume_size`: Disk size (in GB) for the database.
  - `postgresql_version`: PostgreSQL version.
  - `patroni_cluster_name`: PostgreSQL cluster name.
  - `ssh_public_keys`: Your SSH public key to access the database servers after deployment.

  :::note
  See the [default](https://github.com/vitabaks/autobase/tree/2.5.2/automation/roles/common/defaults/main.yml) automation variables for more details, including the list of available [variables](https://github.com/vitabaks/autobase/blob/2.5.2/automation/roles/cloud_resources/defaults/main.yml) for cloud resources.
  :::

  #### 3. Wait until deployment is complete

  This process takes about 10 to 15 minutes.

  :::info
  After a successful deployment, the connection information can be found in the Ansible log.
  :::
  </TabItem>
</Tabs>
