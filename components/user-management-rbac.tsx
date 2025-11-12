"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Shield, Key, Activity, UserPlus, Edit, Trash2, Lock, Unlock, CheckCircle2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "developer" | "researcher" | "viewer"
  status: "active" | "inactive" | "suspended"
  lastActive: string
  apiKeys: number
  jobsRun: number
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface Permission {
  id: string
  name: string
  category: string
  description: string
}

export default function UserManagementRBAC() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@quantum.dev",
      role: "admin",
      status: "active",
      lastActive: "2 minutes ago",
      apiKeys: 3,
      jobsRun: 1247,
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@quantum.dev",
      role: "developer",
      status: "active",
      lastActive: "1 hour ago",
      apiKeys: 2,
      jobsRun: 856,
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol@research.edu",
      role: "researcher",
      status: "active",
      lastActive: "3 hours ago",
      apiKeys: 1,
      jobsRun: 423,
    },
    {
      id: "4",
      name: "David Brown",
      email: "david@company.com",
      role: "viewer",
      status: "inactive",
      lastActive: "2 days ago",
      apiKeys: 0,
      jobsRun: 12,
    },
  ])

  const [roles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full system access with user management capabilities",
      permissions: [
        "users.create",
        "users.read",
        "users.update",
        "users.delete",
        "jobs.create",
        "jobs.read",
        "jobs.cancel",
        "backends.manage",
        "settings.manage",
      ],
      userCount: 1,
    },
    {
      id: "2",
      name: "Developer",
      description: "Can create and manage quantum jobs and circuits",
      permissions: ["jobs.create", "jobs.read", "jobs.cancel", "circuits.create", "circuits.read", "backends.read"],
      userCount: 1,
    },
    {
      id: "3",
      name: "Researcher",
      description: "Can run experiments and view results",
      permissions: ["jobs.create", "jobs.read", "circuits.read", "backends.read", "results.export"],
      userCount: 1,
    },
    {
      id: "4",
      name: "Viewer",
      description: "Read-only access to jobs and results",
      permissions: ["jobs.read", "circuits.read", "results.read"],
      userCount: 1,
    },
  ])

  const [permissions] = useState<Permission[]>([
    { id: "1", name: "users.create", category: "User Management", description: "Create new users" },
    { id: "2", name: "users.read", category: "User Management", description: "View user information" },
    { id: "3", name: "users.update", category: "User Management", description: "Update user details" },
    { id: "4", name: "users.delete", category: "User Management", description: "Delete users" },
    { id: "5", name: "jobs.create", category: "Job Management", description: "Create quantum jobs" },
    { id: "6", name: "jobs.read", category: "Job Management", description: "View job details" },
    { id: "7", name: "jobs.cancel", category: "Job Management", description: "Cancel running jobs" },
    { id: "8", name: "circuits.create", category: "Circuit Management", description: "Create quantum circuits" },
    { id: "9", name: "circuits.read", category: "Circuit Management", description: "View circuits" },
    { id: "10", name: "backends.read", category: "Backend Management", description: "View backend status" },
    { id: "11", name: "backends.manage", category: "Backend Management", description: "Manage backend configuration" },
    { id: "12", name: "settings.manage", category: "System Settings", description: "Manage system settings" },
    { id: "13", name: "results.read", category: "Results", description: "View job results" },
    { id: "14", name: "results.export", category: "Results", description: "Export results data" },
  ])

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "developer":
        return "default"
      case "researcher":
        return "secondary"
      case "viewer":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "outline"
    }
  }

  const permissionsByCategory = permissions.reduce(
    (acc, perm) => {
      if (!acc[perm.category]) {
        acc[perm.category] = []
      }
      acc[perm.category].push(perm)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management & RBAC</h1>
          <p className="text-muted-foreground mt-2">Manage users, roles, and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with role assignment</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="viewer">
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="send-invite" defaultChecked />
                <Label htmlFor="send-invite">Send invitation email</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {users.filter((u) => u.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground mt-2">{permissions.length} permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.apiKeys, 0)}</div>
            <p className="text-xs text-muted-foreground mt-2">Active keys</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.jobsRun, 0)}</div>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Manage user accounts and access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>API Keys</TableHead>
                    <TableHead>Jobs Run</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>{user.apiKeys}</TableCell>
                      <TableCell>{user.jobsRun.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            {user.status === "active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{role.name}</CardTitle>
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Permissions ({role.permissions.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((perm, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="mr-2 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Users className="mr-2 h-3 w-3" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>Granular access control permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(permissionsByCategory).map(([category, perms]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-lg font-semibold">{category}</h3>
                    <div className="space-y-2">
                      {perms.map((perm) => (
                        <div key={perm.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{perm.name}</div>
                            <div className="text-sm text-muted-foreground">{perm.description}</div>
                          </div>
                          <div className="flex gap-2">
                            {roles.map((role) => (
                              <div key={role.id} className="flex items-center gap-1">
                                {role.permissions.includes(perm.name) ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                                )}
                                <span className="text-xs text-muted-foreground">{role.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Track all user actions and system changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    user: "Alice Johnson",
                    action: "Created quantum job",
                    resource: "job-12847",
                    timestamp: "2 minutes ago",
                    status: "success",
                  },
                  {
                    user: "Bob Smith",
                    action: "Updated user role",
                    resource: "user-carol",
                    timestamp: "15 minutes ago",
                    status: "success",
                  },
                  {
                    user: "Carol Williams",
                    action: "Attempted backend access",
                    resource: "ibm_torino",
                    timestamp: "1 hour ago",
                    status: "denied",
                  },
                  {
                    user: "Alice Johnson",
                    action: "Generated API key",
                    resource: "api-key-xyz",
                    timestamp: "2 hours ago",
                    status: "success",
                  },
                  {
                    user: "David Brown",
                    action: "Viewed job results",
                    resource: "job-12840",
                    timestamp: "3 hours ago",
                    status: "success",
                  },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`h-2 w-2 rounded-full ${log.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <div className="flex-1">
                        <div className="font-medium">
                          {log.user} - {log.action}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Resource: {log.resource} • {log.timestamp}
                        </div>
                      </div>
                    </div>
                    <Badge variant={log.status === "success" ? "default" : "destructive"}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
