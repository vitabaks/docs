---
sidebar_position: 3
---

# Backup

Configure database backups for your PostgreSQL cluster.

### Console (UI)

When deploying to cloud providers (such as [AWS](../deployment/aws.md), [GCP](../deployment/gcp.md), [Azure](../deployment/azure.md)) using the Console UI, the storage bucket and backups with [pgBackRest](https://pgbackrest.org) are automatically configured.

:::note
This is not yet implemented for [DigitalOcean](../deployment/digitalocean.md) and [Hetzner Cloud](../deployment/hetzner.md) due to the following reasons:

- DigitalOcean: Requires the [Spaces access keys](https://cloud.digitalocean.com/account/api/spaces) "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY". The ability to specify these keys is planned for future UI releases.
- Hetzner Cloud: Currently does not provide S3 storage. Therefore, manual configuration is required (e.g., connecting to a dedicated PgBackRest server).
:::

- Backup schedule: Full backups every Sunday at 3:00 AM; differential backups Monday through Saturday at 3:00 AM.
- Backup retention: 4 full backups (1 month).
- Config path: `/etc/pgbackrest/pgbackrest.conf`
- Log path: `/var/log/pgbackrest`
- Cron job path: `/etc/cron.d/pgbackrest-<cluster_name>`

Changing the backup configuration through the UI is not yet implemented.

:::tip
If you're interested in this feature, please consider becoming a [sponsor](../sponsor.md).
:::

### Command line

It will be published soon.
