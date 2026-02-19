<template>
  <div class="spend-requests-page">
    <div class="spend-requests-container">
      <h1 class="spend-requests-title">Spend Requests</h1>
      <p class="spend-requests-subtitle">Your submitted spend requests and their current status.</p>

      <div class="table-wrapper">
        <table class="spend-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in spendRequests" :key="request.id">
              <td class="cell-id">{{ request.id }}</td>
              <td>{{ request.description }}</td>
              <td>{{ request.vendor }}</td>
              <td class="cell-amount">{{ formatAmount(request.amount) }}</td>
              <td>
                <span :class="['status-badge', 'status-' + request.status.toLowerCase()]">
                  {{ request.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpendRequestsView',
  data() {
    return {
      spendRequests: [
        { id: 'SR-1001', description: 'Office supplies for Q1', vendor: 'Staples', amount: 245.50, status: 'Approved' },
        { id: 'SR-1002', description: 'Cloud hosting monthly fee', vendor: 'AWS', amount: 1200.00, status: 'Approved' },
        { id: 'SR-1003', description: 'Team lunch meeting', vendor: 'Uber Eats', amount: 89.90, status: 'Pending' },
        { id: 'SR-1004', description: 'Software license renewal', vendor: 'JetBrains', amount: 649.00, status: 'Approved' },
        { id: 'SR-1005', description: 'Conference registration', vendor: 'VueConf', amount: 450.00, status: 'Rejected' },
        { id: 'SR-1006', description: 'New monitor for dev team', vendor: 'Dell', amount: 379.99, status: 'Pending' },
        { id: 'SR-1007', description: 'Marketing brochures print', vendor: 'FedEx Office', amount: 165.00, status: 'Approved' },
        { id: 'SR-1008', description: 'Travel expenses - client visit', vendor: 'Delta Airlines', amount: 523.40, status: 'Pending' },
        { id: 'SR-1009', description: 'Ergonomic keyboard', vendor: 'Logitech', amount: 129.99, status: 'Rejected' },
        { id: 'SR-1010', description: 'Annual domain renewal', vendor: 'Cloudflare', amount: 42.00, status: 'Approved' },
      ],
    }
  },
  methods: {
    formatAmount(amount) {
      return '$' + amount.toFixed(2)
    },
  },
}
</script>

<style scoped>
.spend-requests-page {
  min-height: 100vh;
  padding: 100px 24px 60px;
  background: #fafafa;
}

.spend-requests-container {
  max-width: 900px;
  margin: 0 auto;
}

.spend-requests-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.spend-requests-subtitle {
  font-size: 1rem;
  color: #777;
  margin-bottom: 32px;
}

.table-wrapper {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  overflow-x: auto;
}

.spend-table {
  width: 100%;
  border-collapse: collapse;
}

.spend-table th {
  text-align: left;
  padding: 14px 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  border-bottom: 2px solid #f0f0f0;
  white-space: nowrap;
}

.spend-table td {
  padding: 14px 20px;
  font-size: 0.95rem;
  color: #333;
  border-bottom: 1px solid #f5f5f5;
}

.spend-table tbody tr:last-child td {
  border-bottom: none;
}

.spend-table tbody tr:hover {
  background: #fafafa;
}

.cell-id {
  font-weight: 600;
  color: #4073FF;
  white-space: nowrap;
}

.cell-amount {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-approved {
  background: #e6f9ed;
  color: #1a8a4a;
}

.status-pending {
  background: #fff4e0;
  color: #b5850d;
}

.status-rejected {
  background: #fde8e8;
  color: #c0392b;
}

@media (max-width: 600px) {
  .spend-requests-page {
    padding: 80px 16px 40px;
  }

  .spend-requests-title {
    font-size: 1.6rem;
  }

  .spend-table th,
  .spend-table td {
    padding: 10px 14px;
    font-size: 0.85rem;
  }
}
</style>
