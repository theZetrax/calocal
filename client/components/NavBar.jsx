import Link from 'next/link'

// UI
import { Tooltip, Button, Space } from 'antd'
import { DashboardTwoTone, UserOutlined } from '@ant-design/icons'

import styles from './NavBar.module.css'

const NavBar = () => (
  <nav className={styles.nav}>
    <Space>
      <Link href="/">
        <img className={styles.logo} src="/assets/calocal.svg" height={32} />
      </Link>
      <Link href="/admin">
        <Tooltip
          title="Go to Admin Dashboard"
          mouseEnterDelay={0.3}
          placement="bottom"
        >
          <Button icon={<DashboardTwoTone />} shape="circle" />
        </Tooltip>
      </Link>
    </Space>

    <Link href="/account">
      <Tooltip
        title="Your Account Settings are Here."
        mouseEnterDelay={1}
        placement="bottom"
      >
        <Button type="default" shape="round" size="middle">
          <UserOutlined />
          Account Setting
        </Button>
      </Tooltip>
    </Link>
  </nav>
)

export default NavBar
