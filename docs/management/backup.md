---
sidebar_position: 30
---

# Backup

Configure database backups

### Console (UI)

When deploying to cloud providers (such as [AWS](../deployment/aws.md), [GCP](../deployment/gcp.md), [Azure](../deployment/azure.md)) using the Console UI, the storage bucket and backups with [pgBackRest](https://pgbackrest.org) are automatically configured.

:::note
This feature is not yet available in the UI for [DigitalOcean](../deployment/digitalocean.md) and [Hetzner Cloud](../deployment/hetzner.md) as it requires providing access keys for the backup bucket. The ability to specify these keys is planned for future UI releases. It is already supported via the command line.
:::

- Backup schedule: Full backups every Sunday at 3:00 AM; differential backups Monday through Saturday at 3:00 AM.
- Backup retention: 4 full backups (1 month).
- Config path: `/etc/pgbackrest/pgbackrest.conf`
- Log path: `/var/log/pgbackrest`
- Cron job path: `/etc/cron.d/pgbackrest-<cluster_name>`

Backup configuration changes are currently supported only through the command line.

:::tip
If you’re interested in having this functionality available through the UI, please consider becoming a [sponsor](/docs/sponsor).
:::

### Command line

:::info
When deploying to cloud providers (`cloud_provider` variable) such as AWS, GCP, Azure, the storage bucket and backups with [pgBackRest](https://pgbackrest.org) are automatically configured, controlled by the `pgbackrest_auto_conf` variable (specify `false` if you prefer to manually configure the backup).
:::

The following backup tools are supported:
- [pgBackRest](https://github.com/pgbackrest/pgbackrest)
- [WAL-G](https://github.com/wal-g/wal-g)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="pgBackRest" label="pgBackRest" default>

:::tip
pgBackRest documentation: [Configuration Reference](https://pgbackrest.org/configuration.html)
:::

To use pgBackRest, specify the `pgbackrest_install: true` variable.

**Examples of configuration variables:**

<details>
<summary>pgbackrest config ("posix" ssh mode)</summary>

```yaml
# An example of a configuration using a dedicated backup server (via ssh)

pgbackrest_install: true
pgbackrest_install_from_pgdg_repo: true
pgbackrest_stanza: "{{ patroni_cluster_name }}"  # stanza name
pgbackrest_repo_type: "posix"
pgbackrest_repo_host: "10.128.64.110"  # change this value
pgbackrest_repo_user: "postgres"
pgbackrest_conf_file: "/etc/pgbackrest/pgbackrest.conf"
pgbackrest_conf:
  global:  # [global] section
    - { option: "log-level-file", value: "detail" }
    - { option: "log-path", value: "/var/log/pgbackrest" }
    - { option: "repo1-type", value: "{{ pgbackrest_repo_type | lower }}" }
    - { option: "repo1-host", value: "{{ pgbackrest_repo_host }}" }
    - { option: "repo1-host-user", value: "{{ pgbackrest_repo_user }}" }
    - { option: "repo1-path", value: "/var/lib/pgbackrest" }  # the path to the backup directory on the backup server
    - { option: "spool-path", value: "/var/spool/pgbackrest" }
    - { option: "archive-async", value: "y" }
    - { option: "archive-get-queue-max", value: "1GiB" }
#    - { option: "archive-push-queue-max", value: "100GiB" }
  stanza:  # [stanza_name] section
    - { option: "process-max", value: "4" }
    - { option: "log-level-console", value: "info" }
    - { option: "recovery-option", value: "recovery_target_action=promote" }
    - { option: "pg1-socket-path", value: "{{ postgresql_unix_socket_dir }}" }
    - { option: "pg1-path", value: "{{ postgresql_data_dir }}" }
# dedicated backup server config
pgbackrest_server_conf:
  global:
    - { option: "log-level-file", value: "detail" }
    - { option: "log-level-console", value: "info" }
    - { option: "log-path", value: "/var/log/pgbackrest" }
    - { option: "repo1-path", value: "/var/lib/pgbackrest" }  # the path to the backup directory
    - { option: "repo1-retention-full", value: "4" }
    - { option: "repo1-retention-archive", value: "4" }
    - { option: "archive-check", value: "y" }
    - { option: "archive-copy", value: "n" }
    - { option: "repo1-bundle", value: "y" }
    - { option: "repo1-block", value: "y" }
    - { option: "start-fast", value: "y" }
    - { option: "stop-auto", value: "y" }
    - { option: "link-all", value: "y" }
    - { option: "resume", value: "n" }
    - { option: "backup-standby", value: "y" }
    - { option: "process-max", value: "2" }
# the stanza section will be generated automatically

pgbackrest_archive_command: "pgbackrest --stanza={{ pgbackrest_stanza }} archive-push %p"
```

Additionally specify the IP address of the backup server (in this example "10.128.64.110") in the `inventory` in the "`pgbackrest`" group.
</details>

<details>
<summary>pgbackrest config (Minio S3)</summary>

```yaml
# An example of a configuration using S3 (Minio)

pgbackrest_install: true
pgbackrest_install_from_pgdg_repo: true
pgbackrest_stanza: "{{ patroni_cluster_name }}"  # stanza name
pgbackrest_repo_type: "s3"
pgbackrest_repo_host: ""
pgbackrest_repo_user: ""
pgbackrest_conf_file: "/etc/pgbackrest/pgbackrest.conf"
pgbackrest_conf:
  global:  # [global] section
    - { option: "log-level-file", value: "detail" }
    - { option: "log-path", value: "/var/log/pgbackrest" }
    - { option: "repo1-type", value: "{{ pgbackrest_repo_type | lower }}" }
    - { option: "repo1-path", value: "/pgbackrest" }  # logical path in bucket
    - { option: "repo1-s3-endpoint", value: "https://YOUR_MINIO_ADDRESS" }  # change this value
    - { option: "repo1-s3-key", value: "YOUR_MINIO_S3_KEY" }  # change this value
    - { option: "repo1-s3-key-secret", value: "YOUR_MINIO_S3_KEY_SECRET" }  # change this value
    - { option: "repo1-s3-bucket", value: "YOUR_MINIO_BUCKET" }  # change this value
    - { option: "repo1-s3-region", value: "eu-west-3" }  # change this value
    - { option: "repo1-s3-uri-style", value: "path" }
    - { option: "repo1-storage-verify-tls", value: "n" }
    - { option: "repo1-retention-full", value: "4" }
    - { option: "repo1-retention-archive", value: "4" }
    - { option: "archive-check", value: "y" }
    - { option: "archive-copy", value: "n" }
    - { option: "archive-async", value: "y" }
    - { option: "archive-get-queue-max", value: "1GiB" }
#    - { option: "archive-push-queue-max", value: "100GiB" }
    - { option: "spool-path", value: "/var/spool/pgbackrest" }
    - { option: "repo1-bundle", value: "y" }
    - { option: "repo1-block", value: "y" }
    - { option: "start-fast", value: "y" }
    - { option: "stop-auto", value: "y" }
    - { option: "link-all", value: "y" }
    - { option: "resume", value: "n" }
    - { option: "backup-standby", value: "y" }  # when set to 'y', standby servers will be automatically added to the stanza section.
    - { option: "process-max", value: "2" }
  stanza:  # [stanza_name] section
    - { option: "process-max", value: "4" }
    - { option: "log-level-console", value: "info" }
    - { option: "recovery-option", value: "recovery_target_action=promote" }
    - { option: "pg1-socket-path", value: "{{ postgresql_unix_socket_dir }}" }
    - { option: "pg1-path", value: "{{ postgresql_data_dir }}" }

pgbackrest_archive_command: "pgbackrest --stanza={{ pgbackrest_stanza }} archive-push %p"
```

</details>

<details>
<summary>pgbackrest config (AWS S3)</summary>

```yaml
# An example of a configuration using AWS S3

pgbackrest_install: true
pgbackrest_install_from_pgdg_repo: true
pgbackrest_stanza: "{{ patroni_cluster_name }}"  # stanza name
pgbackrest_repo_type: "s3"
pgbackrest_repo_host: ""
pgbackrest_repo_user: ""
pgbackrest_conf_file: "/etc/pgbackrest/pgbackrest.conf"
pgbackrest_conf:
  global:  # [global] section
    - { option: "log-level-file", value: "detail" }
    - { option: "log-path", value: "/var/log/pgbackrest" }
    - { option: "repo1-type", value: "{{ pgbackrest_repo_type | lower }}" }
    - { option: "repo1-path", value: "/pgbackrest" }  # logical path in bucket
    - { option: "repo1-s3-key", value: "YOUR_AWS_S3_ACCESS_KEY" }  # change this value
    - { option: "repo1-s3-key-secret", value: "YOUR_AWS_S3_SECRET_KEY" }  # change this value
    - { option: "repo1-s3-bucket", value: "YOUR_BUCKET_NAME" }  # change this value
    - { option: "repo1-s3-endpoint", value: "s3.us-east-1.amazonaws.com" }  # change this value
    - { option: "repo1-s3-region", value: "us-east-1" }  # change this value
    - { option: "repo1-retention-full", value: "4" }
    - { option: "repo1-retention-archive", value: "4" }
    - { option: "archive-check", value: "y" }
    - { option: "archive-copy", value: "n" }
    - { option: "archive-async", value: "y" }
    - { option: "archive-get-queue-max", value: "1GiB" }
#    - { option: "archive-push-queue-max", value: "100GiB" }
    - { option: "spool-path", value: "/var/spool/pgbackrest" }
    - { option: "repo1-bundle", value: "y" }
    - { option: "repo1-block", value: "y" }
    - { option: "start-fast", value: "y" }
    - { option: "stop-auto", value: "y" }
    - { option: "link-all", value: "y" }
    - { option: "resume", value: "n" }
    - { option: "backup-standby", value: "y" }  # when set to 'y', standby servers will be automatically added to the stanza section.
    - { option: "process-max", value: "2" }
  stanza:  # [stanza_name] section
    - { option: "process-max", value: "4" }
    - { option: "log-level-console", value: "info" }
    - { option: "recovery-option", value: "recovery_target_action=promote" }
    - { option: "pg1-socket-path", value: "/var/run/postgresql" }
    - { option: "pg1-path", value: "/var/lib/postgresql/data" }

pgbackrest_archive_command: "pgbackrest --stanza={{ pgbackrest_stanza }} archive-push %p"
```

</details>


<details>
<summary>pgbackrest config (Hetzner S3)</summary>

```yaml
# An example of a configuration using Hetzner Object Storage (S3 bucket)

pgbackrest_install: true
pgbackrest_install_from_pgdg_repo: true
pgbackrest_stanza: "{{ patroni_cluster_name }}"  # stanza name
pgbackrest_repo_type: "s3"
pgbackrest_repo_host: ""
pgbackrest_repo_user: ""
pgbackrest_conf_file: "/etc/pgbackrest/pgbackrest.conf"
pgbackrest_conf:
  global:  # [global] section
    - { option: "log-level-file", value: "detail" }
    - { option: "log-path", value: "/var/log/pgbackrest" }
    - { option: "repo1-type", value: "{{ pgbackrest_repo_type | lower }}" }
    - { option: "repo1-path", value: "/pgbackrest" }  # logical path in bucket
    - { option: "repo1-s3-key", value: "YOUR_ACCESS_KEY" }  # change this value
    - { option: "repo1-s3-key-secret", value: "YOUR_SECRET_KEY" }  # change this value
    - { option: "repo1-s3-bucket", value: "YOUR_BUCKET_NAME" }  # change this value
    - { option: "repo1-s3-endpoint", value: "https://fsn1.your-objectstorage.com" }  # change this value (region)
    - { option: "repo1-s3-region", value: "fsn1" }  # change this value
    - { option: "repo1-s3-uri-style", value: "path" }
    - { option: "repo1-retention-full", value: "4" }
    - { option: "repo1-retention-archive", value: "4" }
    - { option: "archive-check", value: "y" }
    - { option: "archive-copy", value: "n" }
    - { option: "archive-async", value: "y" }
    - { option: "archive-get-queue-max", value: "1GiB" }
#    - { option: "archive-push-queue-max", value: "100GiB" }
    - { option: "spool-path", value: "/var/spool/pgbackrest" }
    - { option: "repo1-bundle", value: "y" }
    - { option: "repo1-block", value: "y" }
    - { option: "start-fast", value: "y" }
    - { option: "stop-auto", value: "y" }
    - { option: "link-all", value: "y" }
    - { option: "resume", value: "n" }
    - { option: "backup-standby", value: "y" }  # when set to 'y', standby servers will be automatically added to the stanza section.
    - { option: "process-max", value: "2" }
  stanza:  # [stanza_name] section
    - { option: "process-max", value: "4" }
    - { option: "log-level-console", value: "info" }
    - { option: "recovery-option", value: "recovery_target_action=promote" }
    - { option: "pg1-socket-path", value: "/var/run/postgresql" }
    - { option: "pg1-path", value: "/var/lib/postgresql/data" }

pgbackrest_archive_command: "pgbackrest --stanza={{ pgbackrest_stanza }} archive-push %p"
```

</details>

<details>
<summary>pgbackrest config (GCS)</summary>

```yaml
# An example of a configuration using GCS

pgbackrest_install: true
pgbackrest_install_from_pgdg_repo: true
pgbackrest_stanza: "{{ patroni_cluster_name }}"  # stanza name
pgbackrest_repo_type: "gcs"
pgbackrest_repo_host: ""
pgbackrest_repo_user: ""
pgbackrest_conf_file: "/etc/pgbackrest/pgbackrest.conf"
pgbackrest_conf:
  global:  # [global] section
    - { option: "log-level-file", value: "detail" }
    - { option: "log-path", value: "/var/log/pgbackrest" }
    - { option: "repo1-type", value: "{{ pgbackrest_repo_type | lower }}" }
    - { option: "repo1-path", value: "/pgbackrest" }  # logical path in bucket
    - { option: "repo1-gcs-key", value: "{{ postgresql_home_dir }}/gcs-key.json" }  # change this value (path to GCS service account key file)
    - { option: "repo1-gcs-bucket", value: "YOUR_BUCKET_NAME" }  # change this value
    - { option: "repo1-retention-full", value: "4" }
    - { option: "repo1-retention-archive", value: "4" }
    - { option: "archive-check", value: "y" }
    - { option: "archive-copy", value: "n" }
    - { option: "archive-async", value: "y" }
    - { option: "archive-get-queue-max", value: "1GiB" }
#    - { option: "archive-push-queue-max", value: "100GiB" }
    - { option: "spool-path", value: "/var/spool/pgbackrest" }
    - { option: "repo1-bundle", value: "y" }
    - { option: "repo1-block", value: "y" }
    - { option: "start-fast", value: "y" }
    - { option: "stop-auto", value: "y" }
    - { option: "link-all", value: "y" }
    - { option: "resume", value: "n" }
    - { option: "backup-standby", value: "y" }  # when set to 'y', standby servers will be automatically added to the stanza section.
    - { option: "process-max", value: "2" }
  stanza:  # [stanza_name] section
    - { option: "process-max", value: "4" }
    - { option: "log-level-console", value: "info" }
    - { option: "recovery-option", value: "recovery_target_action=promote" }
    - { option: "pg1-socket-path", value: "/var/run/postgresql" }
    - { option: "pg1-path", value: "/var/lib/postgresql/data" }

pgbackrest_archive_command: "pgbackrest --stanza={{ pgbackrest_stanza }} archive-push %p"
```

</details>

<details>
<summary>pgbackrest config (Azure Blob Storage)</summary>

```yaml
# An example of a configuration using Azure Blob Storage

pgbackrest_install: true
pgbackrest_install_from_pgdg_repo: true
pgbackrest_stanza: "{{ patroni_cluster_name }}"  # stanza name
pgbackrest_repo_type: "azure"
pgbackrest_repo_host: ""
pgbackrest_repo_user: ""
pgbackrest_conf_file: "/etc/pgbackrest/pgbackrest.conf"
pgbackrest_conf:
  global:  # [global] section
    - { option: "log-level-file", value: "detail" }
    - { option: "log-path", value: "/var/log/pgbackrest" }
    - { option: "repo1-type", value: "{{ pgbackrest_repo_type | lower }}" }
    - { option: "repo1-path", value: "/pgbackrest" }  # logical path in Azure Blob container
    - { option: "repo1-azure-key", value: "YOUR_AZURE_STORAGE_ACCOUNT_KEY" }  # change this value
    - { option: "repo1-azure-key-type", value: "shared" }  # key type: 'shared' or 'sas'
    - { option: "repo1-azure-account", value: "YOUR_AZURE_STORAGE_ACCOUNT" }  # change this value
    - { option: "repo1-azure-container", value: "YOUR_AZURE_STORAGE_CONTAINER" }  # change this value
    - { option: "repo1-retention-full", value: "4" }
    - { option: "repo1-retention-archive", value: "4" }
    - { option: "archive-check", value: "y" }
    - { option: "archive-copy", value: "n" }
    - { option: "archive-async", value: "y" }
    - { option: "archive-get-queue-max", value: "1GiB" }
#    - { option: "archive-push-queue-max", value: "100GiB" }
    - { option: "spool-path", value: "/var/spool/pgbackrest" }
    - { option: "repo1-bundle", value: "y" }
    - { option: "repo1-block", value: "y" }
    - { option: "start-fast", value: "y" }
    - { option: "stop-auto", value: "y" }
    - { option: "link-all", value: "y" }
    - { option: "resume", value: "n" }
    - { option: "backup-standby", value: "y" }  # when set to 'y', standby servers will be automatically added to the stanza section.
    - { option: "process-max", value: "2" }
  stanza:  # [stanza_name] section
    - { option: "process-max", value: "4" }
    - { option: "log-level-console", value: "info" }
    - { option: "recovery-option", value: "recovery_target_action=promote" }
    - { option: "pg1-socket-path", value: "/var/run/postgresql" }
    - { option: "pg1-path", value: "/var/lib/postgresql/data" }

pgbackrest_archive_command: "pgbackrest --stanza={{ pgbackrest_stanza }} archive-push %p"
```

</details>

<details>
<summary>cron jobs config</summary>

```yaml
# By default, the cron jobs is created on the database server.
# If 'repo_host' is defined, the cron jobs will be created on the pgbackrest server.
pgbackrest_cron_jobs:
  - name: "pgBackRest: Full Backup"
    file: "/etc/cron.d/pgbackrest-{{ patroni_cluster_name }}"
    user: "postgres"
    minute: "00"
    hour: "3"
    day: "*"
    month: "*"
    weekday: "0"
    job: "if [ $(psql -tAXc 'select pg_is_in_recovery()') = 'f' ]; then pgbackrest --stanza={{ pgbackrest_stanza }} --type=full backup; fi"
  - name: "pgBackRest: Diff Backup"
    file: "/etc/cron.d/pgbackrest-{{ patroni_cluster_name }}"
    user: "postgres"
    minute: "00"
    hour: "3"
    day: "*"
    month: "*"
    weekday: "1-6"
    job: "if [ $(psql -tAXc 'select pg_is_in_recovery()') = 'f' ]; then pgbackrest --stanza={{ pgbackrest_stanza }} --type=diff backup; fi"
  - name: "pgBackRest: Incr Backup"
    file: "/etc/cron.d/pgbackrest-{{ patroni_cluster_name }}"
    user: "postgres"
    minute: "00"
    hour: "*/4"
    day: "*"
    month: "*"
    weekday: "1-6"
    job: "if [ $(psql -tAXc 'select pg_is_in_recovery()') = 'f' ]; then pgbackrest --stanza={{ pgbackrest_stanza }} --type=incr backup; fi"
```

</details>

  </TabItem>
  <TabItem value="WAL-G" label="WAL-G">

:::tip
WAL-G [documentation](https://github.com/wal-g/wal-g/blob/master/docs/PostgreSQL.md)
:::

To use WAL-G, specify the `wal_g_install: true` variable.

**Examples of configuration variables:**

<details>
<summary>wal-g config (Minio S3)</summary>

```yaml
# An example of a configuration using S3 (Minio)

wal_g_install: true
wal_g_version: "3.0.5"
wal_g_path: "/usr/local/bin/wal-g --config {{ postgresql_home_dir }}/.walg.json"
wal_g_json:
  - { option: "AWS_ACCESS_KEY_ID", value: "YOUR_MINIO_ACCESS_KEY_ID" }  # change this value
  - { option: "AWS_SECRET_ACCESS_KEY", value: "YOUR_MINIO_SECRET_ACCESS_KEY" }  # change this value
  - { option: "AWS_ENDPOINT", value: "http://YOUR_MINIO_ADDRESS:9000" }  # change this value
  - { option: "AWS_S3_FORCE_PATH_STYLE", value: "true" }
  - { option: "WALG_S3_PREFIX", value: "s3://YOUR_MINIO_BUCKET" }  # change this value
  - { option: "WALG_COMPRESSION_METHOD", value: "brotli" }  # or "lz4", "lzma", "zstd"
  - { option: "WALG_DELTA_MAX_STEPS", value: "6" }  # determines how many delta backups can be between full backups
  - { option: "WALG_UPLOAD_CONCURRENCY", value: "2" }
  - { option: "WALG_UPLOAD_DISK_CONCURRENCY", value: "2" }
  - { option: "WALG_DOWNLOAD_CONCURRENCY", value: "4" }
  - { option: "WALG_ALIVE_CHECK_INTERVAL", value: "1m" }
  - { option: "PGDATA", value: "{{ postgresql_data_dir }}" }
  - { option: "PGHOST", value: "{{ postgresql_unix_socket_dir }}" }
  - { option: "PGPORT", value: "{{ postgresql_port }}" }
  - { option: "PGUSER", value: "{{ patroni_superuser_username }}" }

wal_g_archive_command: "{{ wal_g_path }} wal-push %p"
```

</details>

<details>
<summary>wal-g config (AWS S3)</summary>

```yaml
# An example of a configuration using AWS S3

wal_g_install: true
wal_g_version: "3.0.5"
wal_g_path: "/usr/local/bin/wal-g --config {{ postgresql_home_dir }}/.walg.json"
wal_g_json:
  - { option: "AWS_ACCESS_KEY_ID", value: "YOUR_AWS_ACCESS_KEY_ID" }  # change this value
  - { option: "AWS_SECRET_ACCESS_KEY", value: "YOUR_AWS_SECRET_ACCESS_KEY" }  # change this value
  - { option: "AWS_REGION", value: "YOUR_AWS_REGION" }  # change this value (e.g., us-east-1)
  - { option: "WALG_S3_PREFIX", value: "s3://YOUR_AWS_BUCKET" }  # change this value
  - { option: "WALG_COMPRESSION_METHOD", value: "brotli" }  # or "lz4", "lzma", "zstd"
  - { option: "WALG_DELTA_MAX_STEPS", value: "6" }  # determines how many delta backups can be between full backups
  - { option: "WALG_UPLOAD_CONCURRENCY", value: "2" }
  - { option: "WALG_UPLOAD_DISK_CONCURRENCY", value: "2" }
  - { option: "WALG_DOWNLOAD_CONCURRENCY", value: "4" }
  - { option: "WALG_ALIVE_CHECK_INTERVAL", value: "1m" }
  - { option: "PGDATA", value: "{{ postgresql_data_dir }}" }
  - { option: "PGHOST", value: "{{ postgresql_unix_socket_dir }}" }
  - { option: "PGPORT", value: "{{ postgresql_port }}" }
  - { option: "PGUSER", value: "{{ patroni_superuser_username }}" }

wal_g_archive_command: "{{ wal_g_path }} wal-push %p"
```

</details>

<details>
<summary>wal-g config (Hetzner S3)</summary>

```yaml
# An example of a configuration using Hetzner Object Storage (S3 bucket)

wal_g_install: true
wal_g_version: "3.0.5"
wal_g_path: "/usr/local/bin/wal-g --config {{ postgresql_home_dir }}/.walg.json"
wal_g_json:
  - { option: "AWS_ACCESS_KEY_ID", value: "YOUR_ACCESS_KEY" }  # change this value
  - { option: "AWS_SECRET_ACCESS_KEY", value: "YOUR_SECRET_KEY" }  # change this value
  - { option: "AWS_ENDPOINT", value: "https://fsn1.your-objectstorage.com" }  # change this value (region)
  - { option: "AWS_REGION", value: "fsn1" }  # change this value
  - { option: "WALG_S3_PREFIX", value: "s3://YOUR_BUCKET_NAME" }  # change this value
  - { option: "AWS_S3_FORCE_PATH_STYLE", value: "true" }
  - { option: "WALG_COMPRESSION_METHOD", value: "brotli" }  # or "lz4", "lzma", "zstd"
  - { option: "WALG_DELTA_MAX_STEPS", value: "6" }  # determines how many delta backups can be between full backups
  - { option: "WALG_UPLOAD_CONCURRENCY", value: "2" }
  - { option: "WALG_UPLOAD_DISK_CONCURRENCY", value: "2" }
  - { option: "WALG_DOWNLOAD_CONCURRENCY", value: "4" }
  - { option: "WALG_ALIVE_CHECK_INTERVAL", value: "1m" }
  - { option: "PGDATA", value: "{{ postgresql_data_dir }}" }
  - { option: "PGHOST", value: "{{ postgresql_unix_socket_dir }}" }
  - { option: "PGPORT", value: "{{ postgresql_port }}" }
  - { option: "PGUSER", value: "{{ patroni_superuser_username }}" }

wal_g_archive_command: "{{ wal_g_path }} wal-push %p"

```

</details>

<details>
<summary>wal-g config (GCS)</summary>

```yaml
# An example of a configuration using GCS

wal_g_install: true
wal_g_version: "3.0.5"
wal_g_path: "/usr/local/bin/wal-g --config {{ postgresql_home_dir }}/.walg.json"
wal_g_json:
  - { option: "GOOGLE_APPLICATION_CREDENTIALS", value: "{{ postgresql_home_dir }}/gcs-key.json" }  # change this value (path to GCS service account key file)
  - { option: "WALG_GS_PREFIX", value: "gs://YOUR_GCS_BUCKET" }  # change this value
  - { option: "WALG_COMPRESSION_METHOD", value: "brotli" }  # or "lz4", "lzma", "zstd"
  - { option: "WALG_DELTA_MAX_STEPS", value: "6" }  # determines how many delta backups can be between full backups
  - { option: "WALG_UPLOAD_CONCURRENCY", value: "2" }
  - { option: "WALG_UPLOAD_DISK_CONCURRENCY", value: "2" }
  - { option: "WALG_DOWNLOAD_CONCURRENCY", value: "4" }
  - { option: "WALG_ALIVE_CHECK_INTERVAL", value: "1m" }
  - { option: "PGDATA", value: "{{ postgresql_data_dir }}" }
  - { option: "PGHOST", value: "{{ postgresql_unix_socket_dir }}" }
  - { option: "PGPORT", value: "{{ postgresql_port }}" }
  - { option: "PGUSER", value: "{{ patroni_superuser_username }}" }

wal_g_archive_command: "{{ wal_g_path }} wal-push %p"
```

</details>

<details>
<summary>wal-g config (Azure Blob Storage)</summary>

```yaml
# An example of a configuration using Azure Blob Storage

wal_g_install: true
wal_g_version: "3.0.5"
wal_g_path: "/usr/local/bin/wal-g --config {{ postgresql_home_dir }}/.walg.json"
wal_g_json:
  - { option: "AZURE_STORAGE_ACCOUNT", value: "YOUR_AZURE_STORAGE_ACCOUNT" }  # change this value
  - { option: "AZURE_STORAGE_ACCESS_KEY", value: "YOUR_AZURE_STORAGE_ACCOUNT_KEY" }  # change this value
  - { option: "WALG_AZ_PREFIX", value: "azure://YOUR_AZURE_STORAGE_CONTAINER" }  # change this value
  - { option: "WALG_COMPRESSION_METHOD", value: "brotli" }  # or "lz4", "lzma", "zstd"
  - { option: "WALG_DELTA_MAX_STEPS", value: "6" }  # determines how many delta backups can be between full backups
  - { option: "WALG_UPLOAD_CONCURRENCY", value: "2" }
  - { option: "WALG_UPLOAD_DISK_CONCURRENCY", value: "2" }
  - { option: "WALG_DOWNLOAD_CONCURRENCY", value: "4" }
  - { option: "WALG_ALIVE_CHECK_INTERVAL", value: "1m" }
  - { option: "PGDATA", value: "{{ postgresql_data_dir }}" }
  - { option: "PGHOST", value: "{{ postgresql_unix_socket_dir }}" }
  - { option: "PGPORT", value: "{{ postgresql_port }}" }
  - { option: "PGUSER", value: "{{ patroni_superuser_username }}" }

wal_g_archive_command: "{{ wal_g_path }} wal-push %p"
```

</details>

<details>
<summary>cron jobs config</summary>

```yaml
# Define job_parts outside of wal_g_cron_jobs
# Ensure there is a space at the beginning of each part to prevent commands from concatenating.
wal_g_backup_command:
  - "curl -I -s http://{{ inventory_hostname }}:{{ patroni_restapi_port }} | grep 200"
  - " && {{ wal_g_path }} backup-push {{ postgresql_data_dir }} > {{ postgresql_log_dir }}/walg_backup.log 2>&1"
wal_g_delete_command:
  - "curl -I -s http://{{ inventory_hostname }}:{{ patroni_restapi_port }} | grep 200"
  - " && {{ wal_g_path }} delete retain FULL 4 --confirm > {{ postgresql_log_dir }}/walg_delete.log 2>&1"

wal_g_cron_jobs:
  - name: "WAL-G: Create daily backup"
    user: "postgres"
    file: /etc/cron.d/walg
    minute: "00"
    hour: "3"
    day: "*"
    month: "*"
    weekday: "*"
    job: "{{ wal_g_backup_command | join('') }}"
  - name: "WAL-G: Delete old backups"
    user: "postgres"
    file: /etc/cron.d/walg
    minute: "30"
    hour: "6"
    day: "*"
    month: "*"
    weekday: "*"
    job: "{{ wal_g_delete_command | join('') }}"
```

</details>

  </TabItem>
</Tabs>
