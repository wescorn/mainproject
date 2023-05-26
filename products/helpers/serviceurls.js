const fs = require('fs');

const isRunningInDocker = () => {
  // Check if the /proc/self/cgroup file exists
  // This file is present in Docker containers but not on host machines
  return fs.existsSync('/proc/self/cgroup');
};


const isRunningInKubernetes = () => {
    // Check if the POD_NAME environment variable is set
    const podName = process.env.POD_NAME;
    if (podName) {
      return true;
    }
  
    // Check if the KUBERNETES_SERVICE_HOST environment variable is set
    const kubernetesServiceHost = process.env.KUBERNETES_SERVICE_HOST;
    if (kubernetesServiceHost) {
      return true;
    }
  
    // Check if the KUBERNETES_PORT environment variable is set
    const kubernetesPort = process.env.KUBERNETES_PORT;
    if (kubernetesPort) {
      return true;
    }
   
    // Check if the KUBERNETES_PORT_443_TCP environment variable is set
    const kubernetesPort443 = process.env.KUBERNETES_PORT_443_TCP;
    if (kubernetesPort443) {
      return true;
    }
  
    // If none of the Kubernetes-specific environment variables are set, assume it's not running in a pod
    return false;
  };

  const GetUrl = (key) => {
    const urls = {
      seq:'localhost:5341',
      zipkin: 'localhost:9411',
      orders: 'localhost:8080',
      versiontwo: 'localhost:8000',
      products: 'localhost:3000'
    }
    if(isRunningInKubernetes()) {
      console.log('IS RUNNING IN KUBERNETES', key);
      return key;
    } else {
      console.log('IS NOT RUNNING IN KUBERNETES', key);
      return urls[key];
    }
  }

  exports.GetUrl = GetUrl