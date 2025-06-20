export const useComponentFormState = (setters) => {
  const {
    setName,
    setRepoTag,
    setDomain,
    setEnvs,
    setCommands,
    setPort,
    setCpu,
    setRam,
    setHdd,
    setTiered,
    setPat,
    setOwner,
    setCompDuration,
    setInstances,
    setSummary,
    setSelectedMethod,
    setBuild,
    setDocker,
    setGrid,
    setIsEditing,

    setEditingId,
  } = setters;

  const loadComponent = (component) => {
    const comp = component.compose[0];
    setName(component.name);
    setRepoTag(comp.repotag);
    setDomain(comp.domains);
    setEnvs(comp.environmentParameters);
    setCommands(comp.commands);
    setPort(comp.containerPorts);
    setCpu(comp.cpu);
    setRam(comp.ram);
    setHdd(comp.hdd);
    setTiered(comp.tiered);
    setPat(comp.repoauth?.split(":")[1] || "");
    setOwner(component.owner);
    setCompDuration(component.expire);
    setInstances(component.instances);
    setSummary(false)
    setSelectedMethod(component.option)
    setIsEditing(true)   
    setEditingId(component.id); 
  };

  const resetComponent = (defaultOwner = "") => {
    setName("");
    setRepoTag("");
    setDomain([""]);
    setEnvs([]);
    setCommands([]);
    setPort([8080]);
    setCpu(0.1);
    setRam(100);
    setHdd(1);
    setTiered(false);
    setPat("");
    setOwner(defaultOwner);
    setCompDuration(20160);
    setInstances(3);
    setSummary(false);
    setSelectedMethod('');
    setBuild(false);
    setGrid(false);
    setDocker(false);
    setIsEditing(false);
    setEditingId(null);
  };

  return { loadComponent, resetComponent };
};
