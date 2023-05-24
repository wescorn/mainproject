const { spawnSync } = require('child_process');

const deploymentName = process.argv[2];

if (!deploymentName) {
  console.error('Please provide the deployment name as an argument.');
  process.exit(1);
}

try {
  const getContainerCommand = spawnSync('kubectl', ['get', 'deployment', deploymentName, '-o', 'jsonpath={.spec.template.spec.containers[0].name}'], { shell: true, encoding: 'utf-8' });

  if (getContainerCommand.status !== 0) {
    console.error('An error occurred while retrieving the container name:', getContainerCommand.stderr);
    process.exit(1);
  }

  const containerName = getContainerCommand.stdout.trim();

  const getPodCommand = spawnSync('kubectl', ['get', 'pods', '-l', `app=${deploymentName}`, '-o', 'jsonpath={.items[0].metadata.name}'], { shell: true, encoding: 'utf-8' });

  if (getPodCommand.status !== 0) {
    console.error('An error occurred while retrieving the pod name:', getPodCommand.stderr);
    process.exit(1);
  }

  const podName = getPodCommand.stdout.trim();

  const shellCommand = spawnSync(
    'kubectl',
    ['exec', '-it', podName, '--container', containerName, '--', '/bin/sh', '-c', 'PS1="\\u@\\w\\$ "; /bin/sh'],
    { shell: true, stdio: 'inherit' }
  );

  if (shellCommand.status !== 0) {
    console.error('An error occurred while accessing the pod shell:', shellCommand.stderr);
    process.exit(1);
  }
} catch (error) {
  console.error('An error occurred:', error.message);
  process.exit(1);
}
