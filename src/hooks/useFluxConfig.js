import { useState } from "react";

export function useFluxConfig(defaultEmail = "", email) {
  const [compDuration, setCompDuration] = useState(20160);
  const [name, setName] = useState("");
  const [repoTag, setRepoTag] = useState("");
  const [domain, setDomain] = useState([""]);
  const [envs, setEnvs] = useState([]);
  const [commands, setCommands] = useState([]);
  const [port, setPort] = useState([8080]);
  const [cpu, setCpu] = useState(0.5);
  const [ram, setRam] = useState(1000);
  const [hdd, setHdd] = useState(1);
  const [tiered, setTiered] = useState(false);
  const [pat, setPat] = useState("");
  const [owner, setOwner] = useState(defaultEmail);
  const [instances, setInstances] = useState(3);
  const [summary, setSummary] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [build, setBuild] = useState(false);
  const [grid, setGrid] = useState(false);
  const [docker, setDocker] = useState(false);
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null);
  const [cloud, setCloud] = useState('FLUX')
  const [colapse, setColapse] = useState(false);

  return {
    config: {
      compDuration,
      name,
      repoTag,
      domain,
      envs,
      commands,
      port,
      cpu,
      ram,
      hdd,
      tiered,
      pat,
      owner,
      instances,
      summary,
      selectedMethod,
      build,
      grid,
      docker,
      isEditing,
      editingId,
      cloud,
      colapse,
    },
    setters: {
      setCompDuration,
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
      setInstances,
      setSummary,
      setSelectedMethod,
      setBuild,
      setDocker,
      setGrid,
      setIsEditing,
      setEditingId,
      setCloud,
      setColapse,
    },
  };
}
