let id = 0;

const HealthStatuses = {};

class HealthStatus {
  constructor(name) {
    this.name = name;
    this.id = id++;

    HealthStatuses[name] = this;
  }

  equals(otherHealthStatus){
    return otherHealthStatus.id === this.id;
  }
}

HealthStatuses.Healthy = new HealthStatus('Healthy');
HealthStatuses.Sick = new HealthStatus('Sick');
HealthStatuses.Immune = new HealthStatus('Immune');
HealthStatuses.Dead = new HealthStatus('Dead');

export default HealthStatuses;
