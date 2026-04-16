import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

const blocks = [
	{
		id: 'automated',
		title: 'Autonomous database',
		description: (
			<>
				A powerful alternative to cloud-managed databases like Amazon RDS, Google Cloud SQL, Azure Database, and others, delivering a fully automated, self-managed PostgreSQL experience.
				<br /> <br />
				Autobase automates deployment, failover, backups, restores, upgrades, scaling, and more, eliminating manual database management.
				Focus on building your applications while Autobase takes care of your database infrastructure.
			</>
		),
	},
	{
		id: 'cost',
		title: 'Cost-effective',
		description: (
			<>
				Save 40-60% or more versus cloud-managed databases.
				<br /> <br />
		        Autobase, an open-source DBaaS on your own infrastructure,
				reduces platform overhead while providing the same reliability and automation.
				<br /> <br />
				Pay only for the server resources you use, with no vendor markup on your database.
			</>
		),
	},
	{
		id: 'control',
		title: 'Full control, no vendor lock-in',
		description: (
			<>
				Your database environment remains fully under your control because both Autobase and the PostgreSQL clusters it deploys
				run on your infrastructure, whether on your own servers or with a cloud provider of your choice.
				<br /> <br />
				You get flexibility for deep configuration changes and SSH access to database hosts, capabilities cloud-managed database services typically do not provide.
				This ensures full operational independence with no vendor lock-in.
			</>
		),
	},
	{
		id: 'scalability',
		title: 'Scalability and performance',
		description: (
			<>
				Designed for businesses of all sizes, Autobase seamlessly adapts to evolving requirements.
				<br /> <br />
				<strong>Optimal configuration.</strong> Autobase automatically creates an optimal setup to keep database performance consistently high.
				<br /> <br />
				<strong>Automated index maintenance.</strong> Autobase continuously monitors and maintains index health, preventing bloat and performance degradation before they become a problem.
				<br /> <br />
				<strong>Read-replicas.</strong> Scale effortlessly with read replicas to maintain high availability and strong performance as workload grows.
			</>
		),
	},
	{
		id: 'blue-green',
		title: 'Blue/Green deployment',
		description: (
			<>
				Autobase supports Blue/Green deployment for <strong>zero-downtime major upgrades</strong>.
				Run upgrades in a parallel environment, validate safely, and switch traffic only when everything is ready.
				<br /> <br />
				See more information in the <a href="/docs/management/upgrades" target="_blank" rel="noopener noreferrer">documentation</a>.
			</>
		),
	},
	{
		id: 'extensibility',
		title: 'Extensibility',
		description: (
			<>
				PostgreSQL is highly extensible.
				With Autobase, you can easily install any of the 400+ available <a href="/docs/extensions/list" target="_blank" rel="noopener noreferrer">extensions </a>
				to equip your database with powerful capabilities tailored to your project’s unique requirements.
			</>
		),
	},
	{
		id: 'security',
		title: 'Data security',
		description: (
			<>
				Built-in encryption, access management, and automated backups (PITR) help ensure security and compliance,
				protecting your database from leaks, unauthorized access, and data loss.
				<br /> <br />
				Keep your data safe, recoverable, and always available.
			</>
		),
	},
  {
		id: 'ui',
		title: 'User-friendly web interface (UI)',
		description: (
			<>
				A user-friendly web interface that simplifies complex database deployment and management tasks.
				<br /> <br />
				With the built-in SQL Editor, you can connect to your clusters, run queries, and manage data directly from the console, all in one place.
				<br /> <br />
				Reduce operational overhead, minimize human error, and streamline workflows.
			</>
		),
	},
	{
		id: 'gitops',
		title: 'Infrastructure as Code and GitOps',
		description: (
			<>
				Define your database infrastructure with repeatable and consistent configurations.
				<a href="/docs/management/gitops" target="_blank" rel="noopener noreferrer"> GitOps</a> support ensures seamless integration with version control, simplifying management and ensuring full traceability.
			</>
		),
	},
	{
		id: 'no-kubernetes',
		title: 'No Kubernetes required',
		description: (
			<>
				Autobase provides a dedicated control layer for deploying, managing, and scaling PostgreSQL clusters directly on VMs and bare metal.
				<br /> <br />
				Instead of adding Kubernetes as another operational layer, Autobase works closer to the infrastructure itself, resulting in a simpler architecture, fewer moving parts, less overhead, and more direct control.
			</>
		),
	},
	{
		id: 'support',
		title: 'Professional support',
		description: (
			<>
				Autobase offers <a href="/docs/support" target="_blank" rel="noopener noreferrer">DBA as a Service</a> (DBAaaS) with PostgreSQL experts.
				Whether you need consultation, optimization, or full database management, our DBAs ensure smooth and efficient operation of your infrastructure.
			</>
		),
	},
];

export default function Features() {
	const [active, setActive] = useState(0);

	const handleKeyDown = useCallback(
		(e, index) => {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setActive((index + 1) % blocks.length);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setActive((index - 1 + blocks.length) % blocks.length);
			}
		},
		[]
	);

	return (
		<section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>Features and Benefits</h2>

			{/* Desktop / tablet tabs */}
			<div className={styles.desktopTabs}>
				<div className={styles.tabsWrapper}>
					<div className={styles.tabsNav} role="tablist" aria-orientation="vertical">
						{blocks.map((b, i) => (
							<button
								key={b.id}
								role="tab"
								id={`feature-tab-${b.id}`}
								aria-selected={i === active}
								aria-controls={`feature-panel-${b.id}`}
								tabIndex={i === active ? 0 : -1}
								className={`${styles.tabButton} ${i === active ? styles.active : ''}`}
								onClick={() => setActive(i)}
								onKeyDown={(e) => handleKeyDown(e, i)}
								type="button"
							>
								{b.title}
							</button>
						))}
					</div>

					<div className={styles.tabPanelWrapper}>
						{blocks.map(
							(b, i) =>
								i === active && (
									<div
										key={b.id}
										id={`feature-panel-${b.id}`}
										role="tabpanel"
										aria-labelledby={`feature-tab-${b.id}`}
										className={styles.tabPanel}
									>
										<h3 className={styles.blockTitle}>{b.title}</h3>
										<p className={styles.description}>{b.description}</p>
									</div>
								)
						)}
					</div>
				</div>
			</div>

			{/* Mobile accordion */}
			<div className={styles.mobileAccordion}>
				{blocks.map((b, i) => {
					const open = i === active;
					return (
						<div key={b.id} className={`${styles.acItem} ${open ? styles.open : ''}`}>
							<button
								type="button"
								className={styles.acHeader}
								aria-expanded={open}
								aria-controls={`mob-panel-${b.id}`}
								onClick={() => setActive(i)}
							>
								<span className={styles.acTitle}>{b.title}</span>
								<span className={styles.acIcon} aria-hidden="true">
									{open ? '−' : '+'}
								</span>
							</button>
							<div
								id={`mob-panel-${b.id}`}
								role="region"
								hidden={!open}
								className={styles.acPanel}
							>
								<p className={styles.description}>{b.description}</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
