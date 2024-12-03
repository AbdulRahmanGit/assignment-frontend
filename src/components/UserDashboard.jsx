import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from '../utils/api';

const UserDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ adminId: '', task: '', file: null });
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
    fetchAssignments();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await api.getAdmins(user.token);
      setAdmins(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to fetch admins',
        variant: "destructive",
      });
    }
  };

  const fetchAssignments = async () => {
    try {
      const data = await api.getUserAssignments(user.token);
      setAssignments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to fetch assignments',
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('adminId', newAssignment.adminId);
      formData.append('task', newAssignment.task);
      if (newAssignment.file) {
        formData.append('submission', newAssignment.file);
      }

      const response = await api.submitAssignment(user.token, formData);
      toast({
        title: "Success",
        description: 'Assignment submitted successfully',
      });
      console.log(response.data)
      console.log(response.error)
      setNewAssignment({ adminId: '', task: '', file: null });
      fetchAssignments();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to submit assignment',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setNewAssignment(prev => ({ ...prev, file }));
    } else {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submit New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminId">Select Admin</Label>
              <Select
                name="adminId"
                value={newAssignment.adminId}
                onValueChange={(value) => setNewAssignment(prev => ({ ...prev, adminId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an admin" />
                </SelectTrigger>
                <SelectContent>
                  {admins.map(admin => (
                    <SelectItem key={admin._id} value={admin._id}>{admin.username}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task">Task Description</Label>
              <Input
                id="task"
                name="task"
                value={newAssignment.task}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="submission">Submission</Label>
              <input type="file" name="file" onChange={handleFileChange} />
            </div>
            <Button type="submit" disabled={loading}>Submit Assignment</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Submission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map(assignment => (
                <TableRow key={assignment._id}>
                  <TableCell>{assignment.adminId ? assignment.adminId.username : 'Unknown'}</TableCell>
                  <TableCell>{assignment.task}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      assignment.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      assignment.status === 'accepted' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {assignment.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(assignment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                    {assignment.feedback}
                    </TableCell>
                  <TableCell>
                    <Button onClick={() => window.open(assignment.submission, '_blank')} className="mr-2">
                      View PDF
                    </Button></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button onClick={logout} className="mt-4">Logout</Button>
    </div>
  );
};

export default UserDashboard;

