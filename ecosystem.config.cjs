module.exports = {
	apps: [{
		name: "pocket-photo-log",
		script: "./dist/server/entry.mjs",
		instances: "1",
		exec_mode: "cluster",
		watch: false,
		max_memory_restart: "1G",
		env: {
			NODE_ENV: "production",
		},
		env_production: {
			...process.env
		}
	}]
}
