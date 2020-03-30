let nextId = 0;

class Job {
  constructor(name, canRemote = false) {
    this.name = name;
    this.canRemote = canRemote;
    this.id = nextId++;
  }
}

const Jobs = {
  NonRemote: new Job('Essential'),
  Remote: new Job('Remote', true),
};

export default Jobs;
