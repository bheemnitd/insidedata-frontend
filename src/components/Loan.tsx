import React, { useState } from 'react';
import styled from 'styled-components';

// Compound interest calculation function
const calculateCompoundInterest = (principal: number, rate: number, timesCompounded: number, years: number) => {
  return principal * Math.pow(1 + rate / timesCompounded, timesCompounded * years);
};

interface User {
  id: string;
  name: string;
  details: string;
  photo?: string;
  signature?: string;
  loans: Loan[];
}

interface Loan {
  amount: number;
  rate: number;
  timesCompounded: number;
  years: number;
  total: number;
}

const LoanManager = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      details: 'Regular customer, good credit history',
      loans: []
    }
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newLoan, setNewLoan] = useState({
    amount: 0,
    rate: 0.05,
    timesCompounded: 12,
    years: 1
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  const handleUserSelect = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user || null);
  };

  const handleAddLoan = () => {
    if (!selectedUser) return;

    const total = calculateCompoundInterest(
      newLoan.amount,
      newLoan.rate,
      newLoan.timesCompounded,
      newLoan.years
    );

    const updatedUser = {
      ...selectedUser,
      loans: [...selectedUser.loans, { ...newLoan, total }],
      photo: photoPreview || undefined,
      signature: signaturePreview || undefined
    };

    setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
    resetForm();
  };

  const handleFileUpload = (file: File, type: 'photo' | 'signature') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'photo') setPhotoPreview(reader.result as string);
      else setSignaturePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setNewLoan({ amount: 0, rate: 0.05, timesCompounded: 12, years: 1 });
    setPhotoPreview(null);
    setSignaturePreview(null);
  };

  return (
    <Container>
      <h2>Loan Management System</h2>
      
      <Section>
        <h3>Select User</h3>
        <Select onChange={(e) => handleUserSelect(e.target.value)}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </Select>
      </Section>

      {selectedUser && (
        <UserSection>
          <h3>User Details</h3>
          <UserInfo>
            {photoPreview && <UserPhoto src={photoPreview} alt="User" />}
            <div>
              <p>{selectedUser.details}</p>
              {signaturePreview && <SignaturePreview src={signaturePreview} alt="Signature" />}
            </div>
          </UserInfo>

          <LoanForm>
            <h3>Add New Loan</h3>
            <FormGroup>
              <label>Loan Amount:</label>
              <Input 
                type="number" 
                value={newLoan.amount}
                onChange={(e) => setNewLoan({...newLoan, amount: Number(e.target.value)})}
              />
            </FormGroup>

            <FormGroup>
              <label>Annual Interest Rate (%):</label>
              <Input 
                type="number" 
                step="0.1"
                value={newLoan.rate * 100}
                onChange={(e) => setNewLoan({...newLoan, rate: Number(e.target.value) / 100})}
              />
            </FormGroup>

            <FormGroup>
              <label>Compounding Frequency:</label>
              <Select
                value={newLoan.timesCompounded}
                onChange={(e) => setNewLoan({...newLoan, timesCompounded: Number(e.target.value)})}
              >
                <option value={1}>Annual</option>
                <option value={12}>Monthly</option>
                <option value={4}>Quarterly</option>
                <option value={365}>Daily</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <label>Loan Term (years):</label>
              <Input 
                type="number" 
                value={newLoan.years}
                onChange={(e) => setNewLoan({...newLoan, years: Number(e.target.value)})}
              />
            </FormGroup>

            <FormGroup>
              <label>Upload Photo:</label>
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'photo')}
              />
            </FormGroup>

            <FormGroup>
              <label>Upload Signature:</label>
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'signature')}
              />
            </FormGroup>

            <Button onClick={handleAddLoan}>Add Loan</Button>
          </LoanForm>

          <LoanList>
            <h3>Existing Loans</h3>
            <Table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Rate</th>
                  <th>Term</th>
                  <th>Total Payable</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.loans.map((loan, index) => (
                  <tr key={index}>
                    <td>${loan.amount.toFixed(2)}</td>
                    <td>{(loan.rate * 100).toFixed(1)}%</td>
                    <td>{loan.years} years</td>
                    <td>${loan.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </LoanList>
        </UserSection>
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
`;

const UserSection = styled.div`
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
`;

const SignaturePreview = styled.img`
  width: 200px;
  height: 80px;
  margin-top: 1rem;
  border: 1px solid #ccc;
`;

const LoanForm = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const LoanList = styled.div`
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background: #f8f9fa;
  }
`;

export default LoanManager;
