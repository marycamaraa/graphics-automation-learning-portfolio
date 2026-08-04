# Kubernetes
---

## Course: Kubernetes 101 Tutorial

### Learning Progress

- [x] Introduction to Kubernetes
- [x] What is Kubernetes?
- [x] Kubernetes Architecture
- [x] Pods
- [x] Deployments
- [ ] Services
- [ ] Namespaces
- [ ] ConfigMaps & Secrets
- [ ] Volumes
- [ ] Ingress
- [ ] Scaling Applications
- [ ] Monitoring & Logging

---

#### What is Kubernetes?

Kubernetes (K8s) is an open-source container orchestration platform used to deploy, manage, and scale containerized applications.

---

#### Why use Kubernetes?

- Automates application deployment.
- Scales applications automatically.
- Self-heals failed containers.
- Manages networking between services.
- Supports rolling updates and rollbacks.

---

#### What is a Pod?

A Pod is the smallest deployable unit in Kubernetes.

- Contains one or more containers.
- Shares storage and network resources.
- Runs as a single application unit.

Example:

```bash
kubectl get pods
```

---

#### What is a Deployment?

A Deployment manages Pods and ensures the desired number of replicas are running.

Example:

```bash
kubectl get deployments
```

---

#### How do I deploy an application?

Create a deployment:

```bash
kubectl create deployment nginx --image=nginx
```

Check the deployment:

```bash
kubectl get deployments
```

Check the pods:

```bash
kubectl get pods
```

---

#### What is a Service?

A Service exposes an application running in Pods.

Types of Services:

- ClusterIP
- NodePort
- LoadBalancer
- ExternalName

Example:

```bash
kubectl get services
```

---

#### Useful Kubernetes Commands
---

## Command Tracker

| Status | Command | Purpose | Notes |
|----------|----------|---------|-------|
| ⬜ | `kubectl cluster-info` | View cluster information | |
| ⬜ | `kubectl get nodes` | List cluster nodes | |
| ⬜ | `kubectl get pods` | List pods in current namespace | |
| ⬜ | `kubectl get pods -A` | List all pods in all namespaces | |
| ⬜ | `kubectl get deployments` | List deployments | |
| ⬜ | `kubectl get services` | List services | |
| ⬜ | `kubectl describe pod <pod-name>` | View pod details | |
| ⬜ | `kubectl logs <pod-name>` | View pod logs | |
| ⬜ | `kubectl exec -it <pod-name> -- bash` | Access pod shell | |
| ⬜ | `kubectl create deployment nginx --image=nginx` | Create deployment | |
| ⬜ | `kubectl scale deployment nginx --replicas=3` | Scale deployment | |
| ⬜ | `kubectl delete pod <pod-name>` | Delete a pod | |
| ⬜ | `kubectl delete deployment nginx` | Delete deployment | |
| ⬜ | `kubectl apply -f app.yaml` | Apply YAML configuration | |
| ⬜ | `kubectl delete -f app.yaml` | Delete resources from YAML | |

### Legend

- ⬜ Not Learned
- 🟨 Learning
- ✅ Practiced
- ⭐ Confident

---

#### Notes

- Kubernetes manages containerized applications.
- Pods are the smallest deployment unit.
- Deployments manage Pods.
- Services expose applications to users.
- Kubernetes supports scaling and self-healing.

---

#### Questions & Follow-up

- [ ] What is the difference between a Pod and a Container?
- [ ] What are ReplicaSets?
- [ ] How does Kubernetes networking work?
- [ ] What is Ingress?
- [ ] How do ConfigMaps and Secrets work?