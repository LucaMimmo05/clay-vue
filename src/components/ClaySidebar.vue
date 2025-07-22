<template>
  <ClayCard>
    <aside class="clay-sidebar">
      <!-- Navigation -->
      <nav class="clay-sidebar__nav">
        <ul>
          <li><a href="#"><i class="icon-home"></i> Dashboard</a></li>
          <li><a href="#"><i class="icon-folder"></i> Projects</a></li>
          <li>
            <a href="#" class="active">
              <i class="icon-message"></i>
              Messages
              <span class="badge">6</span>
            </a>
          </li>
          <li><a href="#"><i class="icon-gear"></i> Services</a></li>
          <li><a href="#"><i class="icon-users"></i> Customers</a></li>
        </ul>
      </nav>

      <hr class="divider" />

      <!-- Contacts -->
      <div class="clay-sidebar__contacts">
        <div class="contacts-header">
          <span>Contacts</span>
          <span class="badge">3</span>
        </div>
        <ul class="contacts-list">
          <li>
            <img src="../assets/avatar1.jpg" alt="Marie" />
            <div>
              <p>Marie Claire</p>
              <small>Paris, FR</small>
            </div>
          </li>
          <li>
            <div class="avatar">MJ</div>
            <div>
              <p>Michael Jordan</p>
              <small>Bucharest, RO</small>
            </div>
          </li>
          <li>
            <img src="../assets/avatar2.jpg" alt="Heather" />
            <div>
              <p>Heather Wright</p>
              <small>London, UK</small>
            </div>
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div class="clay-sidebar__footer">
        <ClayButton class="w-full mb-4">
          Upgrade to PRO
        </ClayButton>
        <ul>
          <li><a href="#"><i class="icon-user"></i> Account</a></li>
          <li><a href="#"><i class="icon-logout"></i> Logout</a></li>
        </ul>
      </div>
    </aside>
  </ClayCard>
</template>

<script lang="ts" setup>
import ClayCard from './ClayCard.vue';
import ClayButton from './ClayButton.vue';
</script>

<style lang="scss">
@use "@/assets/scss/variables";

.clay-sidebar {
  display: flex;
  flex-direction: column;
  width: 280px;
  font-family: variables.$font-family;
  padding: 1.5rem;
  color: #000;

  &__nav ul,
  &__footer ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        text-decoration: none;
        border-radius: 8px;
        color: #333;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease,
          color 0.3s ease,
          border 0.3s ease;

        i {
          margin-right: 0.75rem;
        }

        &.active,
        &:hover {
          background: variables.$primary-color;
          color: #fff;
          border: none;
          box-shadow:
            0 4px 10px rgba(variables.$primary-color, 0.6),
            inset 0 0 8px rgba(255, 255, 255, 0.3);
          transform: translateY(-2px) scale(1.05);
        }

        &:focus-visible {
          outline: none;
          background: variables.$primary-color;
          color: #fff;
          box-shadow:
            0 0 0 3px rgba(variables.$primary-color, 0.8),
            0 4px 12px rgba(variables.$primary-color, 0.7),
            inset 0 0 10px rgba(255, 255, 255, 0.5);
          transform: translateY(-2px) scale(1.05);
        }

        .badge {
          background: #fff;
          font-size: 0.75rem;
          border-radius: 12px;
          padding: 0.2rem 0.6rem;
          color: variables.$primary-color;
          margin-left: auto;
        }
      }
    }
  }

  .divider {
    border: 0;
    border-top: 1px solid #ddd;
    margin: 1.5rem 0;
  }

  &__contacts {
    margin-bottom: 2rem;

    .contacts-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .contacts-list {
      li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;

        img,
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          font-weight: bold;
        }

        p {
          margin: 0;
          font-weight: 500;
          color: #111;
        }

        small {
          font-size: 0.75rem;
          color: #777;
        }
      }
    }
  }

  &__footer {
    margin-top: auto;

    .w-full {
      width: 100%;
    }

    .mb-4 {
      margin-bottom: 1rem;
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .clay-sidebar {
    color: #fff;

    &__nav ul,
    &__footer ul {
      li {
        a {
          color: #c2c5cc;

          &.active,
          &:hover {
            background: variables.$primary-color;
            color: #fff;
            border: none;
            box-shadow:
              0 4px 10px rgba(variables.$primary-color, 0.8),
              inset 0 0 10px rgba(255, 255, 255, 0.5);
            transform: translateY(-2px) scale(1.05);
          }

          &:focus-visible {
            outline: none;
            background: variables.$primary-color;
            color: #fff;
            box-shadow:
              0 0 0 3px rgba(variables.$primary-color, 1),
              0 4px 12px rgba(variables.$primary-color, 0.9),
              inset 0 0 12px rgba(255, 255, 255, 0.6);
            transform: translateY(-2px) scale(1.05);
          }
        }
      }
    }

    .divider {
      border-top-color: #2b2f3a;
    }

    &__contacts {
      .contacts-header {
        color: #aaa;
      }

      .contacts-list li {
        img,
        .avatar {
          background: #666;
          color: white;
        }

        p,
        small {
          color: #aaa;
        }
      }
    }

    &__footer {
      // ClayButton già supporta dark, nessuna modifica necessaria
    }
  }
}
</style>
