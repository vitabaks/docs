import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

const blocks = [
	{
		id: 'automated',
		title: 'Automated self-managed database',
		description: (
			<>
				A powerful alternative to cloud-managed databases like Amazon RDS, Google Cloud SQL, and Azure Database—delivering a fully automated, self-managed PostgreSQL experience.
        <br /> <br />
				Autobase automates deployment, failover, backups, restores, upgrades, scaling, amd more, eliminating the need for manual database management.
			</>
		),
	},
	{
		id: 'control',
		title: 'Full control without vendor lock-In',
		description: (
			<>
				Your database environment remains fully under your control because both the Autobase and the PostgreSQL clusters it deploys
				run on your own infrastructure—whether on your servers or a cloud provider of your choice—ensuring complete independence from vendor lock-in.
			</>
		),
	},
	{
		id: 'cost',
		title: 'Cost-effective database',
		description: (
			<>
				Save 40% and more vs. cloud-managed databases.
        <br />
        Autobase, an open-source DBaaS on your own infrastructure,
				removes extra costs while ensuring the same reliability and automation.
        <br /> <br />
				Pay only for the server resources you use—no vendor markups on your database.
			</>
		),
	},
	{
		id: 'easy',
		title: 'Easy to manage (UI)',
		description: (
			<>
				A user-friendly web interface that simplifies complex database deployment and management tasks.
        <br /> <br />
				Reduce operational overhead, minimize human errors, and streamline workflows effortlessly.
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
		id: 'scalability',
		title: 'Scalability and performance',
		description: (
			<>
				Designed for businesses of all sizes, Autobase seamlessly adapts to evolving requirements.
        <br /> <br />
				Scale effortlessly with read replicas, ensuring high availability and optimal performance as your workload grows.
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
				Built-in encryption, access management, and automated backups (PITR) ensure data security and compliance,
				protecting your database from leaks, unauthorized access, and data loss.
        <br /> <br />
        Keep your data safe, recoverable, and always available.
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
      <h1 className={styles.sectionTitle}>Features and Benefits</h1>

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
