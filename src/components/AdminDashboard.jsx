import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { api } from '../utils/api';

const AdminDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [feedback, setFeedback] = useState('');
  const { user, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await api.getAdminAssignments(user.token);
      setAssignments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to fetch assignments',
        variant: "destructive",
      });
    }
  };

  const handleAssignment = async (id, action) => {
    try {
      await api.updateAssignmentStatus(user.token, id, action);
      toast({
        title: "Success",
        description: `Assignment ${action}ed successfully`,
      });
      fetchAssignments();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${action} assignment`,
        variant: "destructive",
      });
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      await api.addFeedback(user.token, selectedAssignment._id, feedback);
      toast({
        title: "Success",
        description: "Feedback submitted successfully",
      });
      setSelectedAssignment(null);
      setFeedback('');
      fetchAssignments();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Assignments to Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map(assignment => (
                <TableRow key={assignment._id}>
                  <TableCell>{assignment.userId.username}</TableCell>
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
                    <Button onClick={() => window.open(assignment.submission, '_blank')} className="mr-2">
                      View PDF
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedAssignment(assignment)}>Add Feedback</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Feedback</DialogTitle>
                          <DialogDescription>
                            Provide feedback for the assignment submitted by {assignment.userId.username}
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Enter your feedback here..."
                        />
                        <DialogFooter>
                          <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {assignment.status === 'pending' && (
                      <>
                        <Button onClick={() => handleAssignment(assignment._id, 'accept')} className="mr-2">
                          Accept
                        </Button>
                        <Button onClick={() => handleAssignment(assignment._id, 'reject')} variant="destructive">
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
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

export default AdminDashboard;

