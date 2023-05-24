const { execSync } = require('child_process');

const deploymentName = process.argv[2];

if (!deploymentName) {
  console.error('Please provide the deployment name as an argument.');
  process.exit(1);
}

try {
  const podName = execSync(`kubectl get pods -l app=${deploymentName} -o jsonpath='{.items[0].metadata.name}'`, { encoding: 'utf-8' }).trim();
  const command = `kubectl logs ${podName} -f`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('An error occurred:', error.message);
  process.exit(1);
}